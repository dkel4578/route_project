// ../modals/ProductClassificationModal.js
import React, { useState, useEffect } from "react";
import { Modal, Input, Button } from "antd";

const ProductClassificationModal = ({ open, onCancel, initialData }) => {
  const [form, setForm] = useState({
    제품분류코드: "",
    제품분류명: "",
    분류코드: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({ 제품분류코드: "", 제품분류명: "", 분류코드: "" });
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // TODO: redux dispatch (createProductClassification / updateProductClassification) 연결
    console.log("저장할 데이터:", form);
    onCancel();
  };

  const inputStyle = { width: 220, height: 32 };
  const labelStyle = {
    display: "inline-block",
    width: 120,
    textAlign: "right",
    marginRight: 8,
  };

  return (
    <Modal
      title={initialData ? "제품 분류 수정" : "제품 분류 등록"}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      centered
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={labelStyle}>제품분류코드</label>
          <Input
            style={inputStyle}
            value={form.제품분류코드}
            onChange={(e) => handleChange("제품분류코드", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>제품분류명</label>
          <Input
            style={inputStyle}
            value={form.제품분류명}
            onChange={(e) => handleChange("제품분류명", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>분류코드</label>
          <Input
            style={inputStyle}
            value={form.분류코드}
            onChange={(e) => handleChange("분류코드", e.target.value)}
          />
        </div>
      </div>

      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={onCancel} style={{ marginRight: 10 }}>
          취소
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          저장
        </Button>
      </div>
    </Modal>
  );
};

export default ProductClassificationModal;
