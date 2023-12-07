# VieLaw

![VieLaw OpenSource](./docs/images/vielaw_header.png)

Xem trang này dưới ngôn ngữ khác:

- [English](./docs/README_en.md)

## Tính năng
1. Chatbot hỗ trợ thông tin - Test tại đây: https://huggingface.co/nhantran0506
2. Tra cứu pháp điển

## Demo

## Tải xuống

Tất cả mã nguồn của dự án đều sẵn sàng trên Internet, bạn có thể tạo bản sao bằng lệnh sau để bắt đầu tham gia đóng góp vào dự án mã nguồn mở

```
    git clone git@github.com:toantc1024/vielaw.git
```

## Cài đặt

`

### 1. Models

Tạo bản sao của model học máy tại

```
    git clone git@hf.co:spaces/nhantran0506/law-llms-v2
```

### 2. Database

Đối với cơ sở dự liệu, VieLaw sử dụng SQlite. Sau khi tạo bản sao của dự án về máy, đầu tiên chuyển đến thư mục `/package/backend/database`

```
    cd /packages/backend/database
```

Sau đó giải nén tệp `phapdien.zip`

Nếu bạn thực hiện bất kỳ thay đổi nào trong cơ sở dữ liệu hãy nhớ nén lại trước khi commit

### 3. Backend

`Backend`
Backend code is used Python, to safe install you have init a virtual environment
`requirement python >= 3.9`
Create virtual environment

```
    python3 -m venv venv
```

First, to start backend

```
    cd ./packages/backend/
```

Install packages with command

```
    pip install -r requirements.txt
```

Start backend

```
    uvicorn main:app --reload
```

### 4. Frontend

Chuyển con trỏ đến thư mục frontend

```
    cd /packages/frontend
```

Cài đặt các thư viện từ `npm`

```
    npm install
```

Khởi chạy dự án VieLaw trên mức frontend

```
    npm run start
```


Dự án frontend sẽ được chạy trên host mặc đinh là `localhost:3000`

## Thông tin khác

[Wiki](./docs/wiki/vi/Introduction.md)

## Mailing list, bug tracker, ...

E-mails: [toantc1024](mailto:tctoan1024@gmail.com)

## Giấy phép và ghi công
### 1. Front End
- Icons: https://react-icons.github.io/react-icons/ - MIT (Hero Icons)
- ReactJS 18 - MIT
- Font family - Google Fonts - MIT
- Redux - MIT
- React Router Dom
- TailwindCSS
### 2. Backend
fastapi==0.104.1
pydantic==2.5.2
PyJWT==2.8.0
PyJWT==2.8.0
uvicorn==0.24.0.post1
python-dotenv==1.0.0

### 3. Database
SQlite

### 4. Models
Pytorch


Mô hình Open Source Sbert để Fine tuning: https://huggingface.co/keepitreal/vietnamese-sbert

## Người đóng góp

## Tài trợ

