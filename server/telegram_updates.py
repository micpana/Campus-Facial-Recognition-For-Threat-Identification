from telegram_messages import get_updates, send_message
from database import init_db
from models import User, ProcessedTelegramMessages

init_db()
print('Telegram Updates module is up and running')

# array for storing messages already processed
messages_checked = []

# retrieve processed messages saved in our database
all_messages = ProcessedTelegramMessages.objects.all()
for item in all_messages:
    update_id = item.update_id
    messages_checked.append(update_id)

# check if we are on a development or production server
from config_data import server
current_server = server()
if current_server == 'development':
    # mark all found messages as checked to avoid responding to tons of prior messages that would have been responded to already
    messages = get_updates()
    for item in messages:
        update_id = str(item['update_id'])
        messages_checked.append(update_id)

# check for messages
while True:
    # retrieve messages
    messages = get_updates()

    # go through messages
    for item in messages:
        processed_successfully = None
        sender = ''
        message = ''
        update_id = ''
        try:
            sender = str(item['message']['from']['id'])
            message = item['message']['text']
            update_id = str(item['update_id'])
            processed_successfully = True
        except:
            processed_successfully = False

        # only process message if it hasn't been processed yet
        if update_id not in messages_checked:
            # if user sends /start message
            if message == '/start':
                response_message = """
                    Hie there, to get started make sure you're registered on https://mudimbucapital.tech. To start receiving signals via our bot, send us the email you used to register on Mudimbu Capital.
                """
                send_message(sender, response_message)

            # check if the message contains an email address
            elif ('@' in message) and ('.' in message):
                # check if email is registered on Mudimbu Capital
                user = User.objects.filter(email = message)

                if len(user) == 0:
                    send_message(sender, "The email address you've supplied is not registered on Mudimbu Capital. Visit https://mudimbucapital.tech/signup to signup.")
                else:
                    # check if the user account has been verified via email
                    user_account_status = user[0].account_status
                    if user_account_status == 'Not verified':
                        send_message(sender, "The email address you've supplied is linked to an account that has not been verified yet. Please check your mailbox for the verification email we sent you and click the verification url we provided.")
                    
                    else:
                        user_id = user[0].id
                        firstname = user[0].firstname
                        user_telegram_verified = user[0].telegram_verified

                        # check if user has already linked with telegram
                        if user_telegram_verified == True:
                            send_message(sender, 'This email address has already been used to link to a telegram account.')
                        else:
                            # update user profile with telegram details
                            User.objects(id=user_id).update(telegram_verified = True, telegram_chat_id = sender)
                            send_message(sender, "Congratulations {}, you have successfully linked your Mudimbu Capital account to your Telegram account. You'll start receiving signals on your Telegram.".format(firstname))
            else:
                send_message(sender, 'Please send the email address you used to register on Mudimbu Capital.')

            # if chat has been processed successfully
            if processed_successfully == True:
                # add update id to processed messages
                messages_checked.append(update_id)

                # add processed message to database
                processed_message = ProcessedTelegramMessages(
                    update_id = update_id
                )
                processed_message.save()