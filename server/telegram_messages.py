import requests
import json

# telegram token
token = '1788963824:AAHM2vdZCpLQ5mqEmLXHj22jovo7SM1Vukg'

# api url
api_url = 'https://api.telegram.org/bot{}/'.format(token)

# send telegram message
def send_message(chat_id, message):
    message_sent = False

    # keep trying to send the message until successful
    while message_sent == False:
        try:
            request_url = api_url + 'sendMessage?chat_id={}&text={}'.format(chat_id, message)
            requests.get(request_url)
            message_sent = True
        except:
            print('\n\nSomething went wrong while trying to send a Telegram message. Trying again.\n\n')

# get message updates
def get_updates():
    try:
        request_url = api_url + "getUpdates?timeout=100"
        request_result = requests.get(request_url)
        result = json.loads(request_result.content)
        messages = result['result']
    except:
        print('\n\nSomething went wrong while trying to check for new Telegram messages. \n\n')

    return messages