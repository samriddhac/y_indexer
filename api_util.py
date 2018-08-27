# -*- coding: utf-8 -*-
import flask
import api_config as config

def remove_empty_kwargs(**kwargs):
  good_kwargs = {}
  if kwargs is not None:
    for key, value in kwargs.items():
      if value:
        good_kwargs[key] = value
  return good_kwargs

def search_list_by_keyword(client, **kwargs):
  kwargs = remove_empty_kwargs(**kwargs)
  response = client.search().list(
    **kwargs
  ).execute()
  return print_response(build_wrap_response(200, filter_fields(response), None))

def send_response(response_type, status=200, data=None, error=None):
    switcher = {
        config.response_type_conversion_progress: [status, config.res_generic_conversion_progress, None],
        config.response_type_text_response: [status, data, None]
    }
    params = switcher.get(response_type, [500, None, config.res_generic_conversion_error])
    return print_response(build_wrap_response(params[0], params[1], params[2]))

def print_response(response):
  if response:
    return flask.jsonify(**response)
  else:
    return ('This request does not return a response. For these samples, ' +
            'this is generally true for requests that delete resources, ' +
            'such as <code>playlists.delete()</code>, but it is also ' +
            'true for some other methods, such as <code>videos.rate()</code>.')
    

def build_wrap_response(status, result, error):
    res = {
        'status':status,
        'data':result,
        'error':error
    }
    return res

def filter_fields(response):
    result = {}
    result_list = []
    for item in response['items']:
        if 'id' in item and 'videoId' in item['id']:
            id = item['id']['videoId']
            title = item['snippet']['title']
            description = item['snippet']['description']
            publishedAt = item['snippet']['publishedAt']
            thumbnails = item['snippet']['thumbnails']['default']
            
            res_dict = {
               'id':id,
               'type':type,
               'title':title,
               'description':description,
               'publishedAt':publishedAt,
               'thumbnails':thumbnails
            }
            result_list.append(res_dict)
    
    result['items'] = result_list
    result['pageInfo'] = response['pageInfo']
    result['regionCode'] = response['regionCode']
    result['nextPageToken'] = response['nextPageToken']
    return result