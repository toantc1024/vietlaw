# %%%
import sqlite3

con = sqlite3.connect("./database/phapdien.db",
                      check_same_thread=False)
cur = con.cursor()


def lay_du_lieu(table_name):
    cur.execute("SELECT * FROM " + table_name)
    return cur.fetchall()


def lay_all_chuDe():
    cur.execute("SELECT * from chuDe")
    return cur.fetchall()


def lay_all_deMuc():
    cur.execute("SELECT Text from deMuc")
    return cur.fetchall()


def lay_all_deMuc_from_a_chuDe(chude):
    query = "SELECT * FROM chude WHERE text LIKE ?"
    cur.execute(query, ('%' + chude + '%',))

    return cur.fetchall()


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
