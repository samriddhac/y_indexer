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
        if id and type:
            t1 = current_milli_time()
            url = config.BASE_URI+id
            yt = YouTube(url)
            file_name = yt.streams.first().default_filename
            
            in_file_name = id + config.INPUT_FILE_EXT
            out_file_name = id + config.OUTPUT_FILE_EXT
            out_text_file_name = id + config.TEXT_RAW + config.OUTPUT_TEXT_FILE_EXT
            file_path = config.DOWNLOAD_LOCATION+config.FILE_SEPARATOR+file_name
            in_file_path = config.DOWNLOAD_LOCATION+config.FILE_SEPARATOR+in_file_name
            out_file_path = config.DOWNLOAD_LOCATION+config.FILE_SEPARATOR+out_file_name
            out_text_file_path = config.DOWNLOAD_LOCATION+config.FILE_SEPARATOR+out_text_file_name
            
            pr_status = 0
            
            if not os.path.isfile(in_file_path):
                print('Downloading ', url)
                yt.streams.first().download(config.DOWNLOAD_LOCATION)
                print('Download complete ')
    
            if os.path.isfile(file_path) and not os.path.isfile(in_file_path):
                os.rename(file_path, in_file_path)
                
            if os.path.isfile(in_file_path) and not os.path.isfile(out_file_path):
                command = config.FFMPEG_PATH+'ffmpeg -i '+in_file_path+' '+out_file_path
                pr_status = subprocess.call(command, shell=True)
            
            if config.aws_transcribe_enabled == 'Y':
                perform_aws_transcribe(id)
            
            if os.path.isfile(out_file_path) and pr_status == 0 and not os.path.isfile(out_text_file_path):
                r = sr.Recognizer()
                with sr.AudioFile(out_file_path) as source:
                    audio = r.record(source)
                    try:
                        raw_text = r.recognize_sphinx(audio)
                        with open(out_text_file_path, 'w') as f:
                            f.write(raw_text)
                    except sr.UnknownValueError:
                        print("Sphinx could not understand audio")
                    except sr.RequestError as e:
                        print("Sphinx error; {0}".format(e))
                
            if os.path.isfile(out_text_file_path):
                print('Convertion successfull ')
                t_analyzer.analyze_text(id)
            
            t2 = current_milli_time()
            print('Execution time ', (t2-t1))
    
    except:
        print('Conversion failed ', sys.exc_info()[0])
        raise
        
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
    