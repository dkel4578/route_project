import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryPage } from "../redux/slices/categorySlice.js";
import { themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "antd";
import CategoryModal from "../modals/CategoryModal.jsx";

ModuleRegistry.registerModules([AllCommunityModule]);

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.category);

  const [modalOpen, setModalOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);

  useEffect(() => {
    dispatch(fetchCategoryPage());
  }, [dispatch]);

  const rowData = useMemo(() => data ?? [], [data]);

  const columnDefs = useMemo(
    () => [
      { headerName: "분류코드", field: "id", flex: 1 },
      { headerName: "분류명", field: "분류명", flex: 2 },
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
      <div className="flex items-center justify-center h-[300px] text-gray-600">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-2"></div>
        데이터 불러오는 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md max-w-md mx-auto mt-10 shadow">
        ⚠️ 데이터 로딩 중 오류 발생: {error}
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">📂 카테고리 목록</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditRow(null);
            setModalOpen(true);
          }}
        >
          + 카테고리 등록
        </Button>
      </div>

      {/* 그리드 */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-4">
        <div className="ag-theme-quartz" style={{ width: "100%" }}>
          <AgGridReact
            theme={themeQuartz}
            rowData={rowData}
            columnDefs={columnDefs}
            domLayout="autoHeight"
            animateRows={true}
            pagination={true}
            paginationPageSize={8}
            rowSelection={{ mode: "single" }}
          />
        </div>
      </div>

      {/* 모달 */}
      <CategoryModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        initialData={editRow}
        onSuccess={() => dispatch(fetchCategoryPage())} // ✅ 저장 후 갱신
      />
    </div>
  );
};

export default CategoryPage;
