# %%%
import sqlite3
con = sqlite3.connect("./vietlaw_database/phapdien.db",
                      check_same_thread=False)
cur = con.cursor()


def lay_du_lieu(table_name):
    cur.execute("SELECT * FROM " + table_name)
    return cur.fetchall()


# %%
