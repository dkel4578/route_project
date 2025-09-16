import React, { useEffect, useMemo, useState } from 'react';
import { fetchSalePage } from "../redux/slices/salesSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { themeQuartz } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import "../index.css";
import SaleModal from "../modals/SaleModal.jsx";
import { Button } from "antd";

ModuleRegistry.registerModules([AllCommunityModule]);

const SalesPage = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.sales);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRow, setEditRow] = useState(null); // ✅ 추가

  useEffect(() => {
    dispatch(fetchSalePage());
  }, [dispatch]);

  const rowData = useMemo(() => data ?? [], [data]);

  const columnDefs = useMemo(
    () => [
      { headerName: "주문일", field: "날짜", flex: 1 },
      { headerName: "제품코드", field: "제품코드", flex: 1 },
      { headerName: "고객코드", field: "고객코드", flex: 1 },
      { headerName: "프로모션코드", field: "프로모션코드", flex: 1 },
      { headerName: "채널코드", field: "채널코드", flex: 1 },
      { headerName: "주문수량", field: "Quantity", flex: 1 },
      { headerName: "단가", field: "UnitPrice", flex: 1 },
      { headerName: "지역", field: "지역", flex: 1 },
      {
        headerName: "액션",
        flex: 1,
        cellRenderer: (params) => (
          <Button
            size="small"
            onClick={() => {
              setEditRow(params.data);  // ✅ 수정할 데이터 세팅
              setIsModalOpen(true);
            }}
          >
            수정
          </Button>
        ),
      },
    ],
    []
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-lg text-gray-600">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mr-3"></div>
        데이터 불러오는 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md max-w-xl mx-auto mt-10 shadow">
        ⚠️ 데이터 로딩 중 오류 발생: {error}
      </div>
    );
  }

  return (
    <>
      {/* 상단 버튼 */}
      <div style={{ display:"flex", justifyContent: "flex-end", paddingBottom: "10px" }}>
        <Button
          type="primary"
          onClick={() => {
            setEditRow(null);     // ✅ 신규 등록 모드
            setIsModalOpen(true);
          }}
        >
          판매 등록
        </Button>
      </div>

      {/* 모달 */}
      <SaleModal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          dispatch(fetchSalePage()); // ✅ 닫을 때 목록 갱신
        }}
        initialData={editRow}
      />

      {/* 그리드 */}
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 판매 내역</h1>
          <p className="text-gray-600">
            최근 주문 데이터를 한눈에 확인하고 필터링할 수 있습니다.
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-4">
          <div style={{ height: 600, width: 1200 }}>
            <AgGridReact
              theme={themeQuartz}
              rowData={rowData}
              columnDefs={columnDefs}
              animateRows={true}
              domLayout="autoHeight"
              pagination={true}
              rowSelection={{ mode: "single" }}
              enableBrowserTooltips={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesPage;
