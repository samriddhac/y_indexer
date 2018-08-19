# -*- coding: utf-8 -*-

import sys
from pytube import YouTube
import os
import subprocess
import time
import threading
import speech_recognition as sr
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