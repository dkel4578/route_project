import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Select } from "antd";

const 지역목록 = [
  { 지역코드: 11110, 시도: "서울특별시", 구군시: "종로구" },
  { 지역코드: 11140, 시도: "서울특별시", 구군시: "중구" },
  { 지역코드: 26110, 시도: "부산광역시", 구군시: "중구" },
  { 지역코드: 26140, 시도: "부산광역시", 구군시: "서구" },
];

const API_URL = "http://localhost:3001/사용자";

const SaleModal = ({ open, onCancel, initialData }) => {
  const [form, setForm] = useState({
    날짜: "",
    수량: "",
    단가: "",
    시도: "",
    지역코드: "",
    제품코드: "",
    고객코드: "",
    프로모션코드: "",
    채널코드: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        날짜: initialData.날짜 || "",
        수량: initialData.Quantity?.toString() || "",
        단가: initialData.UnitPrice?.toString() || "",
        시도: initialData.지역 || "",
        지역코드: initialData.지역코드?.toString() || "",
        제품코드: initialData.제품코드?.toString() || "",
        고객코드: initialData.고객코드?.toString() || "",
        프로모션코드: initialData.프로모션코드?.toString() || "",
        채널코드: initialData.채널코드?.toString() || "",
      });
    } else {
      setForm({
        날짜: "",
        수량: "",
        단가: "",
        시도: "",
        지역코드: "",
        제품코드: "",
        고객코드: "",
        프로모션코드: "",
        채널코드: "",
      });
    }
  }, [initialData, open]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSidoChange = (sido) => {
    const region = 지역목록.find((r) => r.시도 === sido);
    const 지역코드 = region ? region.지역코드 : "";
    setForm((prev) => ({ ...prev, 시도: sido, 지역코드 }));
  };

  const handleSubmit = async () => {
  const preparedData = {
    날짜: form.날짜,
    지역: form.시도,
    지역코드: parseInt(form.지역코드, 10),
    프로모션코드: parseInt(form.프로모션코드, 10),
    Quantity: parseInt(form.수량, 10),
    UnitPrice: parseInt(form.단가, 10),
    제품코드: parseInt(form.제품코드, 10),
    고객코드: parseInt(form.고객코드, 10),
    채널코드: parseInt(form.채널코드, 10),
  };

  try {
    if (initialData?.id) {
      // 수정 모드 → PUT
      await fetch(`${API_URL}/${initialData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preparedData),
      });
    } else {
      // 신규 등록 → POST
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preparedData),
      });
    }

    if (typeof onCancel === "function") onCancel();
  } catch (err) {
    console.error("판매 데이터 저장 실패 ❌", err);
  }
};

  // ✅ 라벨/입력 필드 묶음 함수
  const renderContactRow = (title) => {
    const inputStyle = { width: 180, height: 32 };
    const labelStyle = {
      display: "inline-block",
      width: 100,
      textAlign: "right",
      marginRight: 8,
    };

    return (
      <div style={{ marginBottom: 10 }}>
        <div
          className="top-bar"
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#3b6ea5",
            padding: "6px 14px",
            color: "white",
            marginBottom: 10,
            borderRadius: "6px 6px 0 0",
          }}
        >
          <div className="title" style={{ fontSize: 16, fontWeight: "bold" }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", gap: 20, marginBottom: 8 }}>
          <div>
            <label style={labelStyle}>날짜</label>
            <Input
              style={inputStyle}
              value={form.날짜}
              onChange={(e) => handleChange("날짜", e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyle}>수량</label>
            <Input
              style={inputStyle}
              value={form.수량}
              onChange={(e) => handleChange("수량", e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyle}>단가</label>
            <Input
              style={inputStyle}
              value={form.단가}
              onChange={(e) => handleChange("단가", e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyle}>지역</label>
            <Select
              style={inputStyle}
              value={form.시도}
              onChange={handleSidoChange}
            >
              {[...new Set(지역목록.map((r) => r.시도))].map((sido) => (
                <Select.Option key={sido} value={sido}>
                  {sido}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          <div>
            <label style={labelStyle}>제품코드</label>
            <Input
              style={inputStyle}
              value={form.제품코드}
              onChange={(e) => handleChange("제품코드", e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyle}>고객코드</label>
            <Input
              style={inputStyle}
              value={form.고객코드}
              onChange={(e) => handleChange("고객코드", e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyle}>프로모션코드</label>
            <Input
              style={inputStyle}
              value={form.프로모션코드}
              onChange={(e) => handleChange("프로모션코드", e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyle}>채널코드</label>
            <Input
              style={inputStyle}
              value={form.채널코드}
              onChange={(e) => handleChange("채널코드", e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  // ✅ return은 여기 하나만
  return (
    <Modal
      title={null}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1100}
      centered
      closeIcon={false}
      style={{ top: 30 }}
    >
      {renderContactRow(initialData ? "판매 수정" : "판매 등록")}

      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={onCancel} style={{ marginRight: 10 }}>
          취소
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          {initialData ? "수정" : "등록"}
        </Button>
      </div>
    </Modal>
  );
};

export default SaleModal;
