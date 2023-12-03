import sqlite3

conn = sqlite3.connect("./vietlaw_database/phapdien.db", check_same_thread=False)
cursor = conn.cursor()


def create_fts_table():
    cursor.execute(
        """
        CREATE VIRTUAL TABLE IF NOT EXISTS htmlContent_fts USING fts5(Value, Content);
    """
    )
    cursor.execute(
        """
        INSERT INTO htmlContent_fts (Value, Content)
        SELECT Value, Content FROM htmlContent;
    """
    )

    conn.commit()


create_fts_table()


def search_html_content(query):
    conn = sqlite3.connect("./vietlaw_database/phapdien.db", check_same_thread=False)
    cursor = conn.cursor()

    # Perform a full-text search
    cursor.execute(
        "SELECT Value, Content FROM htmlContent_fts WHERE htmlContent_fts MATCH ?",
        (query,),
    )

    results = cursor.fetchall()
    return results


# Replace 'your_search_query' with your search term
search_query = "Cơ quan có thẩm quyền cho phép các hoạt động nghiên cứu"
search_html_content(search_query)

conn.close()
