// ../modals/PromotionModal.js
import React, { useState, useEffect } from "react";
import { Modal, Input, Button } from "antd";

const PromotionModal = ({ open, onCancel, initialData }) => {
  const [form, setForm] = useState({
    프로모션코드: "",
    프로모션: "",
    할인율: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({ 프로모션코드: "", 프로모션: "", 할인율: "" });
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // TODO: redux dispatch (createPromotion / updatePromotion) 연결
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
      title={initialData ? "프로모션 수정" : "프로모션 등록"}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      centered
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={labelStyle}>프로모션코드</label>
          <Input
            style={inputStyle}
            value={form.프로모션코드}
            onChange={(e) => handleChange("프로모션코드", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>프로모션</label>
          <Input
            style={inputStyle}
            value={form.프로모션}
            onChange={(e) => handleChange("프로모션", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>할인율</label>
          <Input
            style={inputStyle}
            value={form.할인율}
            onChange={(e) => handleChange("할인율", e.target.value)}
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

export default PromotionModal;
