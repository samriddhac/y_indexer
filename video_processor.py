# -*- coding: utf-8 -*-

import sys
from pytube import YouTube
import os
import subprocess
import time
import threading
import speech_recognition as sr
import boto3
import urllib
import re
import api_config as config
import text_analyzer as t_analyzer

current_milli_time = lambda: int(round(time.time() * 1000))

def processVideo(id, type):
    try:
        thread = threading.Thread(target=processVideoAsync, args=(id, type))
        thread.daemon = True
        thread.start()
    except:
        print('Conversion failed ')
        raise
        

def processVideoAsync(id, type):
    try:
        if id:
            t1 = current_milli_time()
            url = config.BASE_URI+id
            yt = YouTube(url)
            file_name = yt.streams.first().default_filename
            
            file_location =  config.DOWNLOAD_LOCATION+config.FILE_SEPARATOR
            in_file_name = id + config.INPUT_FILE_EXT
            out_file_name = id + config.OUTPUT_FILE_EXT
            out_text_file_name = id + config.TEXT_RAW + config.OUTPUT_TEXT_FILE_EXT
            file_path = file_location+file_name
            in_file_path = file_location+in_file_name
            out_file_path = file_location+out_file_name
            out_text_file_path = file_location+out_text_file_name
            
            pr_status = 0
            split_wav = True
            
            if not os.path.isfile(in_file_path):
                print('Downloading ', url)
                yt.streams.first().download(config.DOWNLOAD_LOCATION)
                print('Download complete ')
    
            if os.path.isfile(file_path) and not os.path.isfile(in_file_path):
                os.rename(file_path, in_file_path)
                
            if os.path.isfile(in_file_path) and not os.path.isfile(out_file_path):
                command = config.FFMPEG_PATH+'ffmpeg -i '+in_file_path+' '+out_file_path
                pr_status = subprocess.call(command, shell=True)
                
            if pr_status == 0:    
                file_dict = split_file(id, out_file_path)
                
            files = []
            if not os.path.isfile(out_text_file_path):
                r = sr.Recognizer()
                raw_text = ''
                for idx, entry in file_dict.items():
                    file = entry.get('file')
                    pause = entry.get('pause')
                    if os.path.isfile(file):
                        files.append(file)
                        t3 = current_milli_time()
                        with sr.AudioFile(file) as source:
                            audio = r.record(source)
                            try:
                                separator = ','
                                if pause > 5.0 and pause<10.0 :
                                    separator = '.'
                                elif pause > 10.0 :
                                    separator = '.\n'
                                raw_text =raw_text + r.recognize_sphinx(audio) + separator
                            except sr.UnknownValueError:
                                print("Sphinx could not understand audio")
                            except sr.RequestError as e:
                                print("Sphinx error; {0}".format(e))
                        t4 = current_milli_time()
                        print('File ',file,' transcribe time ',(t4-t3))
                        
                with open(out_text_file_path, 'w') as f:
                    f.write(raw_text)
                    
            if split_wav == True:
                delete_temp_files(files)

            if os.path.isfile(out_text_file_path):
                print('Convertion successfull ')
                t_analyzer.analyze_text(id)
            
            if config.aws_transcribe_enabled == 'Y':
                perform_aws_transcribe(id)
            
            t2 = current_milli_time()
            print('Execution time ', (t2-t1))
    
    except:
        print('Conversion failed ', sys.exc_info()[0])
        raise
        

def split_file(id, in_file_path):
    file_dict = {}
    try:
        buffer = 0.3
        file_location =  config.DOWNLOAD_LOCATION+config.FILE_SEPARATOR
        vol_file = file_location+id+'_vol.txt'
        cmd_2 = config.FFMPEG_PATH+'ffmpeg -i '+ in_file_path +' '\
            +'-af silencedetect=noise=-30dB:d=0.5 -f null - 2>' \
            +vol_file
        pr_status_segment = subprocess.call(cmd_2, shell=True)
        if pr_status_segment == 0:
            if os.path.isfile(vol_file):
                with open(vol_file, 'r', encoding='utf8') as f:
                    vol_content = f.read()
                    lines = vol_content.split('\n')
                    start_list = []
                    end_list = []
                    duration_list = []
                    for line in lines:
                        silence_start = 'silence_start:'
                        silence_end = 'silence_end:'
                        silence_duration = 'silence_duration:'
                        pipe = '|'
                        if silence_start in line:
                            start_list.append(float(line[line.index(silence_start)+len(silence_start)+1:]))
                        else:
                            if silence_end in line:
                                end_list.append(float(line[line.index(silence_end)+len(silence_end)+1:line.index(pipe)-1]))
                            if silence_duration in line:
                                duration_list.append(float(line[line.index(silence_duration)+len(silence_duration)+1:]))
                    print(len(start_list))
                    if len(start_list) == len(end_list) :
                        idx = 0
                        start_idx = 0
                        if start_list[0] > 0:
                            start_period = start_list[0] - 0 + buffer
                            out_file_0 = file_location+id+'_'+str(idx)+config.OUTPUT_FILE_EXT
                            cmd_0 = config.FFMPEG_PATH+'ffmpeg -ss '+ str(0) \
                                    + ' -t '+ str(start_period) +' -i '+in_file_path \
                                    + ' '+out_file_0
                            print(cmd_0)
                            pr_status_split_0 = subprocess.call(cmd_0, shell=True)
                            print(pr_status_split_0)
                            if pr_status_split_0 == 0:
                                entry_0 = {}
                                entry_0['file']=out_file_0
                                entry_0['pause']=duration_list[0]
                                file_dict[idx]=entry_0
                        for i in range(len(start_list)):
                            if start_idx < len(start_list) :
                                last_idx = len(start_list)-1
                                if i != last_idx:   
                                    start_time = end_list[start_idx] - buffer
                                    for j in range(start_idx,len(start_list)):
                                        if duration_list[j] < 3 and j != last_idx-1:
                                            continue
                                        else:
                                            idx = idx + 1
                                            period = start_list[j+1] - start_time + buffer
                                            out_file = file_location+id+'_'+str(idx)+config.OUTPUT_FILE_EXT
                                            cmd = config.FFMPEG_PATH+'ffmpeg -ss '+ str(start_time) \
                                                    + ' -t '+ str(period) +' -i '+in_file_path \
                                                    + ' '+out_file
                                            print(cmd)
                                            pr_status_split = subprocess.call(cmd, shell=True)
                                            print(pr_status_split)
                                            if pr_status_split == 0:
                                                entry = {}
                                                entry['file']=out_file
                                                entry['pause']=duration_list[j]
                                                file_dict[idx]=entry
                                            start_idx = j
                                            break
                            start_idx = start_idx + 1
    except:
        print('Conversion failed ', sys.exc_info()[0])
        raise
    return file_dict

def delete_temp_files(filelist):
    try:
        for file in filelist:
            os.remove(file)
    except:
        print('Conversion failed ', sys.exc_info()[0])

def perform_aws_transcribe(id):
    in_file_name = id + config.OUTPUT_FILE_EXT
    in_file_path = config.DOWNLOAD_LOCATION+config.FILE_SEPARATOR+in_file_name
    out_text_file_name = id + config.TEXT_TRANSCRIPT + config.OUTPUT_TEXT_FILE_EXT
    out_text_file_path = config.DOWNLOAD_LOCATION+config.FILE_SEPARATOR+out_text_file_name
    try:
        cmd_1 = [config.AWS_CLI_PATH+'aws', 's3', 'ls', 
                 config.S3_FOLDER+config.FILE_SEPARATOR+in_file_name]
        p = subprocess.Popen(cmd_1, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output, err = p.communicate()
        if output is None or output.decode("utf-8").index(in_file_name) < 0:
            command = [config.AWS_CLI_PATH+'aws', 's3', 'cp', in_file_path, config.S3_FOLDER]
            subprocess.call(command, shell=True)
            print('Audio transffered to s3 location')
        transcribe = boto3.client('transcribe', region_name='us-west-2')
        job_name = id+"_job_"+str(current_milli_time())
        job_uri = config.S3_URI+id+config.OUTPUT_FILE_EXT
        transcribe.start_transcription_job(
            TranscriptionJobName=job_name,
            Media={'MediaFileUri': job_uri},
            MediaFormat=config.OUTPUT_MEDIA_FORMAT,
            LanguageCode='en-US'
        )
        while True:
            status = transcribe.get_transcription_job(TranscriptionJobName=job_name)
            if status['TranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED', 'FAILED']:
                break
            print("Not ready yet...")
            time.sleep(5)
        print(status)
        if status['TranscriptionJob']['Transcript']['TranscriptFileUri']:
            transcript_uri = status['TranscriptionJob']['Transcript']['TranscriptFileUri']
            print(transcript_uri)
            tr_file_name = config.TRANSCRIBE_FILE+id+'.json'
            urllib.request.urlretrieve(transcript_uri,tr_file_name)
            with open(tr_file_name, 'r', encoding='utf8') as f:
                content = f.read()
                with open(out_text_file_path, 'w') as fs:
                    fs.write(content)
                
    except:
        print('Conversion failed ', sys.exc_info()[0])
        raise  
    