import React, { useState, useEffect } from "react";
import { Modal, Input, Button, message } from "antd";

const API_URL = "http://localhost:3001/제품";

const ProductModal = ({ open, onCancel, initialData,onSuccess }) => {
  const [form, setForm] = useState({
    제품명: "",
    색상: "",
    원가: "",
    단가: "",
    제품분류코드: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        제품명: initialData.제품명 || "",
        색상: initialData.색상 || "",
        원가: initialData.원가?.toString() || "",
        단가: initialData.단가?.toString() || "",
        제품분류코드: initialData.제품분류코드?.toString() || "",
      });
    } else {
      setForm({
        제품명: "",
        색상: "",
        원가: "",
        단가: "",
        제품분류코드: "",
      });
    }
  }, [initialData, open]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const preparedData = {
      제품명: form.제품명,
      색상: form.색상,
      원가: parseInt(form.원가, 10),
      단가: parseInt(form.단가, 10),
      제품분류코드: parseInt(form.제품분류코드, 10),
    };

    try {
      if (initialData?.id) {
        await fetch(`${API_URL}/${initialData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(preparedData),
        });
        message.success("제품이 수정되었습니다 ✅");
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(preparedData),
        });
        message.success("제품이 등록되었습니다 ✅");
      }
       if (typeof onSuccess === "function") onSuccess(); // ✅ 부모에게 알림
      if (typeof onCancel === "function") onCancel();
    } catch (err) {
      console.error(err);
      message.error("제품 저장 실패 ❌");
    }
  };

  const inputStyle = { width: 180, height: 32 };
  const labelStyle = {
    display: "inline-block",
    width: 120,
    textAlign: "right",
    marginRight: 8,
  };

  return (
    <Modal
      title={initialData ? "제품 수정" : "제품 등록"}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={800}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <div>
          <label style={labelStyle}>제품명</label>
          <Input
            style={inputStyle}
            value={form.제품명}
            onChange={(e) => handleChange("제품명", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>색상</label>
          <Input
            style={inputStyle}
            value={form.색상}
            onChange={(e) => handleChange("색상", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>원가</label>
          <Input
            style={inputStyle}
            value={form.원가}
            onChange={(e) => handleChange("원가", e.target.value)}
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
          <label style={labelStyle}>제품분류코드</label>
          <Input
            style={inputStyle}
            value={form.제품분류코드}
            onChange={(e) => handleChange("제품분류코드", e.target.value)}
          />
        </div>
      </div>

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

export default ProductModal;
