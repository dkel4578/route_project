# 📊 Data Dashboard Project

이 프로젝트는 **React + Redux + ag-Grid + Ant Design + json-server**를 활용하여 
다양한 데이터(제품, 판매, 카테고리, 지역, 프로모션, 사용자 등)를 관리할 수 있는 대시보드 웹 애플리케이션입니다.  

## 🚀 주요 기능

- **CRUD 기능**: json-server와 연동하여 데이터 등록, 수정, 삭제 가능
- **데이터 테이블**: ag-Grid를 이용한 강력한 데이터 표시 및 필터링
- **모달 관리**: Ant Design 모달로 직관적인 데이터 입력/수정 UI 제공
- **권역별 필터링**: 지역 데이터를 수도권/영남권/호남권 등으로 필터링
- **리액트 라우터**: 페이지 이동 및 메뉴별 라우팅 지원

---

## 🛠 기술 스택

- **Frontend**: React, Redux Toolkit, React Router
- **UI 라이브러리**: Ant Design, ag-Grid
- **Backend(Mock API)**: json-server
- **빌드 도구**: Vite
- **언어**: JavaScript (ES6+)

---

## 📂 프로젝트 구조

```plaintext
src/
 ├── pages/                # 페이지 컴포넌트 (ProductPage, SalesPage, CategoryPage 등)
 ├── modals/               # 모달 컴포넌트 (ProductModal, SaleModal, UserModal 등)
 ├── redux/                # Redux Toolkit slice 모음
 │    └── slices/          # 각 데이터별 slice (productSlice, salesSlice 등)
 ├── App.jsx               # 라우팅 설정
 └── main.jsx              # 엔트리 포인트
server/
 └── db.json               # json-server 데이터 저장소
```

---

## ⚙️ 실행 방법

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/data-dashboard.git
cd data-dashboard
```

### 2. 패키지 설치
```bash
npm install
```

### 3. json-server 실행
```bash
npm run server
```
👉 `server/db.json`을 기반으로 `http://localhost:3001` 에 API 서버 실행

### 4. React 앱 실행
```bash
npm run dev
```
👉 브라우저에서 `http://localhost:5173` 접속

---

## 📊 주요 엔드포인트 (json-server)

| 자원 | 엔드포인트               |
|------|--------------------------|
| 제품 | `http://localhost:3001/제품` |
| 판매 | `http://localhost:3001/판매` |
| 카테고리 | `http://localhost:3001/카테고리` |
| 지역 | `http://localhost:3001/지역` |
| 프로모션 | `http://localhost:3001/프로모션` |
| 사용자 | `http://localhost:3001/사용자` |

---

## ✨ 향후 개선 방향

- 삭제(Delete) 기능 추가
- 검색 및 필터링 기능 강화
- UI/UX 디자인 고도화
- 실제 백엔드 API 연동

---

## 📄 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.
