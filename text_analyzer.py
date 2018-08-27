# -*- coding: utf-8 -*-
import api_config as config
import os
import sys
import json

def get_text(id):
    response_text = {}
    out_text_file_name_raw = config.DOWNLOAD_LOCATION+config.FILE_SEPARATOR + id + config.TEXT_RAW + config.OUTPUT_TEXT_FILE_EXT
    out_text_file_name_transcript = config.DOWNLOAD_LOCATION+config.FILE_SEPARATOR + id + config.TEXT_TRANSCRIPT + config.OUTPUT_TEXT_FILE_EXT
    out_text_file_name_summary_abs = config.DOWNLOAD_LOCATION+config.FILE_SEPARATOR + id + config.TEXT_SUMMARY_ABSTRACT + config.OUTPUT_TEXT_FILE_EXT
    out_text_file_name_summary_exact = config.DOWNLOAD_LOCATION+config.FILE_SEPARATOR + id + config.TEXT_SUMMARY_EXACT + config.OUTPUT_TEXT_FILE_EXT
    out_text_file_name_nr = config.DOWNLOAD_LOCATION+config.FILE_SEPARATOR + id + config.TEXT_NAMED_ENTITIES + config.OUTPUT_TEXT_FILE_EXT
    try:
        if os.path.isfile(out_text_file_name_raw):
            with open(out_text_file_name_raw, 'r', encoding='utf8') as f:
                raw_text = f.read()
                response_text['raw'] = raw_text
        if os.path.isfile(out_text_file_name_transcript):
            with open(out_text_file_name_transcript, 'r', encoding='utf8') as f:
                trans_text = f.read()
                json_obj = json.loads(trans_text)
                response_text['transcript'] = json_obj
        if os.path.isfile(out_text_file_name_summary_abs):
            with open(out_text_file_name_summary_abs, 'r', encoding='utf8') as f:
                summary_text_abs = f.read()
                response_text['summary_abs'] = summary_text_abs
        if os.path.isfile(out_text_file_name_summary_exact):
            with open(out_text_file_name_summary_exact, 'r', encoding='utf8') as f:
                summary_text_exact = f.read()
                response_text['summary_exact'] = summary_text_exact
        if os.path.isfile(out_text_file_name_nr):
            with open(out_text_file_name_nr, 'r', encoding='utf8') as f:
                nr_text = f.read()
                response_text['nr'] = nr_text
    except:
        print('Process not completed ', sys.exc_info()[0])
        
    return response_text

def check_text(ids):
    response_text = {}
    if ids is not '':
        idxs = [x.strip() for x in ids.split(',')]
        if len(idxs)>0:
            for idx in idxs:
                out_text_file_name_raw = config.DOWNLOAD_LOCATION+config.FILE_SEPARATOR + idx + config.TEXT_RAW + config.OUTPUT_TEXT_FILE_EXT
                try:
                    if os.path.isfile(out_text_file_name_raw):
                        response_text[idx] = True
                    else:
                        response_text[idx] = False
                except:
                    print('Process not completed ', sys.exc_info()[0]) 
    return response_text

def analyze_text(id):
    pass