import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocationPage } from "../redux/slices/locationSlice.js";
import { themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "antd";
import LocationModal from "../modals/LocationModal.jsx";

ModuleRegistry.registerModules([AllCommunityModule]);

const LocationPage = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.location);

  const [modalOpen, setModalOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);

  useEffect(() => {
    dispatch(fetchLocationPage());
  }, [dispatch]);

  const rowData = useMemo(() => data ?? [], [data]);

  const columnDefs = useMemo(
    () => [
      { headerName: "지역코드", field: "id", flex: 1 },
      { headerName: "시/도", field: "시도", flex: 1 },
      { headerName: "구/군/시", field: "구군시", flex: 1 },
      { headerName: "지역", field: "지역", flex: 1 },
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🌍 지역 목록</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditRow(null);
            setModalOpen(true);
          }}
        >
          + 지역 등록
        </Button>
      </div>

      {/* 그리드 */}
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

      {/* 모달 */}
      <LocationModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        initialData={editRow}
        onSuccess={() => dispatch(fetchLocationPage())} // ✅ 저장 후 갱신
      />
    </div>
  );
};

export default LocationPage;
