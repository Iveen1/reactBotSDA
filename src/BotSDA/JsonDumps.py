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
    for i in data:
        out['items'].append({'item_name': i[1], 'item_link': i[3], 'price': i[4], 'last_update_date': i[5], 'img_url': i[6]})

    saveJson(out, 'itemsDump.json')


if __name__ == "__main__":
    writeAccsJson()
    writeItemsJson()