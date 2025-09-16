import React, { useState, useEffect } from "react";
import { Modal, Input, Button, message } from "antd";

const API_URL = "http://localhost:3001/지역";

const LocationModal = ({ open, onCancel, initialData, onSuccess }) => {
  const [form, setForm] = useState({
    시도: "",
    구군시: "",
    지역: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        시도: initialData.시도 || "",
        구군시: initialData.구군시 || "",
        지역: initialData.지역 || "",
      });
    } else {
      setForm({
        시도: "",
        구군시: "",
        지역: "",
      });
    }
  }, [initialData, open]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const preparedData = {
      시도: form.시도,
      구군시: form.구군시,
      지역: form.지역,
    };

    try {
      if (initialData?.id) {
        await fetch(`${API_URL}/${initialData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(preparedData),
        });
        message.success("지역이 수정되었습니다 ✅");
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(preparedData),
        });
        message.success("지역이 등록되었습니다 ✅");
      }

      if (typeof onSuccess === "function") onSuccess();
      if (typeof onCancel === "function") onCancel();
    } catch (err) {
      console.error(err);
      message.error("지역 저장 실패 ❌");
    }
  };

  const inputStyle = { width: 250, height: 32 };
  const labelStyle = { display: "inline-block", width: 80, marginRight: 8 };

  return (
    <Modal
      title={initialData ? "지역 수정" : "지역 등록"}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={600}
    >
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>시/도</label>
        <Input
          style={inputStyle}
          value={form.시도}
          onChange={(e) => handleChange("시도", e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>구/군/시</label>
        <Input
          style={inputStyle}
          value={form.구군시}
          onChange={(e) => handleChange("구군시", e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>지역</label>
        <Input
          style={inputStyle}
          value={form.지역}
          onChange={(e) => handleChange("지역", e.target.value)}
        />
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

export default LocationModal;
