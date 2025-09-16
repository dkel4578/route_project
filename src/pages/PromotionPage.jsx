import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeQuartz } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { fetchPromotionPage } from "../redux/slices/promotionSlice.js";
import { Button } from "antd";
import PromotionModal from "../modals/PromotionModal"; // ✅ 모달 import

ModuleRegistry.registerModules([AllCommunityModule]);

const PromotionPage = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.promotion);

  const [modalOpen, setModalOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);

  useEffect(() => {
    dispatch(fetchPromotionPage());
  }, [dispatch]);

  const rowData = useMemo(() => data ?? [], [data]);

  const columnDefs = useMemo(
    () => [
      { headerName: "프로모션 코드", field: "프로모션코드", flex: 1 },
      { headerName: "프로모션", field: "프로모션", flex: 1 },
      { headerName: "할인율", field: "할인율", flex: 1 },
      {
        headerName: "액션",
        flex: 1,
        cellRenderer: (params) => (
          <Button
            size="small"
            onClick={() => {
              setEditRow(params.data);
              setModalOpen(true);
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
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📊 프로모션 목록
          </h1>
          <p className="text-gray-600">프로모션 목록입니다.</p>
        </div>
        <Button
          type="primary"
          onClick={() => {
            setEditRow(null); // 신규 등록
            setModalOpen(true);
          }}
        >
          + 프로모션 등록
        </Button>
      </div>

      {/* 그리드 카드 */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-4">
        <div className="ag-theme-quartz" style={{ height: 600, width: "100%" }}>
          <AgGridReact
            theme={themeQuartz}
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={true}
            pagination={true}
            rowSelection={{ mode: "single" }}
            enableBrowserTooltips={true}
          />
        </div>
      </div>

      {/* 프로모션 등록/수정 모달 */}
      <PromotionModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        initialData={editRow}
      />
    </div>
  );
};

export default PromotionPage;
