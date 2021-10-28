from os import getenv
import sqlite3
import shutil
import win32crypt

def copy_history_file():
    original = f'{getenv("LOCALAPPDATA")}/Google/Chrome/User Data/Default/History'
    target = fr'{getenv("USERPROFILE")}/History'

    shutil.copyfile(original, target)

def copy_pw_file ():
    original = f'{getenv("LOCALAPPDATA")}/Google/Chrome/User Data/Default/Login Data'
    target = f'{getenv("USERPROFILE")}/Login Data'

    shutil.copyfile(original, target)

def print_history():
    conn = sqlite3.connect(f'{getenv("USERPROFILE")}/History')
    cur = conn.cursor()
    cur.execute("SELECT url FROM urls")
    history = cur.fetchall()
    print('\n'.join(str(i) for i in history))
    conn.close()

def print_password():
    conn = sqlite3.connect(f'{getenv("USERPROFILE")}/Login Data')
    cur = conn.cursor()
    cur.execute("SELECT action_url, username_value, password_value FROM logins")
    for result in cur.fetchall():
        url = result[0]
        username = result[1]
        # dosen't work, chrome changed how they encrypt their file :C
        password = win32crypt.CryptUnprotectData(result[2], None, None, None, 0)[1]
        print(url, username, password)
    conn.close()

if __name__ == '__main__':
    copy_history_file()
    print_history()
