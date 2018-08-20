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

aws_transcribe_enabled = 'N'

BASE_URI = 'https://www.youtube.com/watch?v='
S3_URI = 'https://s3-us-west-2.amazonaws.com/video-uploads-sam/'
S3_FOLDER = 's3://video-uploads-sam'

if env == 'local':
    DOWNLOAD_LOCATION = 'C://downloaded_videos'
    FFMPEG_PATH = 'C://personal/project/practice_work/ffmpeg/bin/'
    FILE_SEPARATOR = '/'
    AWS_CLI_PATH = r'C://Program Files/Amazon/AWSCLI/'
else:
    DOWNLOAD_LOCATION = '/home/ubuntu/efs_shared/indexer'
    FFMPEG_PATH = '/usr/bin/'
    FILE_SEPARATOR = '/'
    AWS_CLI_PATH = 'C://Program Files/Amazon/AWSCLI/'


INPUT_FILE_EXT = '.mp4'
OUTPUT_FILE_EXT = '.wav'
OUTPUT_MEDIA_FORMAT = 'wav'
OUTPUT_TEXT_FILE_EXT = '.txt'

TEXT_RAW = '_raw'
TEXT_TRANSCRIPT = '_transcript'
TEXT_SUMMARY_ABSTRACT = '_summary_abs'
TEXT_SUMMARY_EXACT = '_summary_exact'
TEXT_NAMED_ENTITIES = '_nr'

TRANSCRIBE_FILE = 'aws_asrOutput_'

response_type_conversion_progress = 1
response_type_text_response = 2

res_generic_conversion_progress = 'Conversion In Progress'
res_generic_conversion_error = 'Server Error'