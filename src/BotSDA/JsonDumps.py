from db import BotDB, SubsDB
import json


def saveJson(data, filename):
    with open(filename, 'w', encoding='utf-8') as accountDump:
        json.dump(data, accountDump, ensure_ascii=False)


def writeAccsJson():
    data = BotDB().getAllAccounts()
    out = {}
    out['accounts'] = []
    for i in data:
        out['accounts'].append({'login': i[1], 'passwd': i[2], 'last_user': i[4], 'last_request_time': i[5], 'secret_key': i[6]})

    saveJson(out, 'accountDump.json')


def writeItemsJson():
    data = SubsDB().getAllItems()
    out = {}
    out['items'] = []
    try:
        for i in data:
            print(i)
            out['items'].append({'id': i[0], 'item_name': i[1], 'item_link': i[3], 'price': i[4][1::], 'currency_type': i[4][0], 'last_update_date': i[5], 'img_url': i[6]})
    except Exception:
        out['items'].append({'id': i[0], 'item_name': i[1], 'item_link': i[3], 'price': 'обновление...', 'currency_type': '', 'last_update_date': i[5], 'img_url': i[6]})

    saveJson(out, 'itemsDump.json')


if __name__ == "__main__":
    writeAccsJson()
    writeItemsJson()