# -*- coding: utf-8 -*-
import sys

env = 'local'
if len(sys.argv)>1:
    env = sys.argv[1]

print('Environment ',env)

SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl']
API_SERVICE_NAME = 'youtube'
API_VERSION = 'v3'
SECRET_KEY = 'AIzaSyB5vbq9PNE8Oid_Gsb1YfGci0xdf3H4O-E'

BASE_URI = 'https://www.youtube.com/watch?v='

if env == 'local':
    DOWNLOAD_LOCATION = 'C://downloaded_videos'
    FFMPEG_PATH = 'C://personal/project/practice_work/ffmpeg/bin/'
    FILE_SEPARATOR = '/'
else:
    DOWNLOAD_LOCATION = '/home/ubuntu/efs_shared/indexer'
    FFMPEG_PATH = '/usr/bin/'
    FILE_SEPARATOR = '/'


INPUT_FILE_EXT = '.mp4'
OUTPUT_FILE_EXT = '.wav'
OUTPUT_TEXT_FILE_EXT = '.txt'

TEXT_RAW = '_raw'
TEXT_SUMMARY_ABSTRACT = '_summary_abs'
TEXT_SUMMARY_EXACT = '_summary_exact'
TEXT_NAMED_ENTITIES = '_nr'

response_type_conversion_progress = 1
response_type_text_response = 2

res_generic_conversion_progress = 'Conversion In Progress'
res_generic_conversion_error = 'Server Error'