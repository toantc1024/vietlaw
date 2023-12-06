# %%%
import sqlite3
import os

con = sqlite3.connect("./database/phapdien.db",
                      check_same_thread=False)
cur = con.cursor()


def lay_du_lieu(table_name):
    cur.execute("SELECT * FROM " + table_name)
    return cur.fetchall()


def lay_all_chuDe():
    cur.execute("SELECT * from chuDe")
    return cur. fetchall()


def lay_de_muc_content(demucId):
    # cur.execute("SELECT Content from htmlContent WHERE Value = ?", (demucId,))
    # return cur.fetchall()
    # Get html file from d
    pass


def lay_all_deMuc():
    cur.execute("SELECT * from deMuc")
    return cur.fetchall()


def getPhapDienData():
    return {
        'chude': lay_all_chuDe(),
        'demuc': lay_all_deMuc()
    }


def lay_all_deMuc_from_a_chuDe(chudeId):
    query = "SELECT * FROM deMuc WHERE deMuc.ChuDe = ?"
    cur.execute(query, (chudeId,))


def lay_noidung_of_de_muc(de_muc_value):
    # Nhap id
    query = "SELECT Content FROM htmlContent WHERE Value = ?"

    try:
        cur.execute(query, (de_muc_value,))
        content = cur.fetchone()
        if content:
            return content[0]
        else:
            print("khong co noi dung nay:", de_muc_value)
    except sqlite3.Error as e:
        print(f"da co loi: {e}")


# %%
