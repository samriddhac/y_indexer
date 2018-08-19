# -*- coding: utf-8 -*-
import flask
import json

from apiclient.discovery import build

import api_util as util
import api_config as config
import video_processor as processor
import text_analyzer as t_analyzer

app = flask.Flask(__name__)

@app.route('/search/videos')
def search():
    client = build(config.API_SERVICE_NAME, config.API_VERSION, developerKey=config.SECRET_KEY)
    
    keyword = flask.request.args.get('text')
    num_result = flask.request.args.get('max_result')
    page_token = flask.request.args.get('page_token')
    
    return util.search_list_by_keyword(client,
        part='snippet',
        maxResults=num_result,
        q=keyword,
        pageToken=page_token,
        type='')
    

@app.route('/process/videos')
def process():
    
    id = flask.request.args.get('id')
    type = flask.request.args.get('type')
    processor.processVideo(id,type)
    return util.send_response(config.response_type_conversion_progress)

@app.route('/get/texts')
def get_text():
    
    id = flask.request.args.get('id')
    response_text = t_analyzer.get_text(id)
    return util.send_response(config.response_type_text_response, data=response_text)

@app.route('/health')
def health():
    response = {
        "status":200,
        "data":"",
        "error":""        
    }
    return flask.Response(json.dumps(response), mimetype=u'application/json')



if __name__=='__main__':
    app.run(host='0.0.0.0', 9000, debug=True)
