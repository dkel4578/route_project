// ../modals/DateModal.js
import React, { useState, useEffect } from "react";
import { Modal, Input, Button } from "antd";

const DateModal = ({ open, onCancel, initialData }) => {
  const [form, setForm] = useState({
    날짜코드: "",
    날짜: "",
    년도: "",
    분기: "",
    월: "",
    월영문: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        날짜코드: "",
        날짜: "",
        년도: "",
        분기: "",
        월: "",
        월영문: "",
      });
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // TODO: redux dispatch (createDate / updateDate) 연결
    console.log("저장할 데이터:", form);
    onCancel();
  };

  const inputStyle = { width: 200, height: 32 };
  const labelStyle = {
    display: "inline-block",
    width: 90,
    textAlign: "right",
    marginRight: 8,
  };

  return (
    <Modal
      title={initialData ? "날짜 수정" : "날짜 등록"}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      centered
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={labelStyle}>날짜코드</label>
          <Input
            style={inputStyle}
            value={form.날짜코드}
            onChange={(e) => handleChange("날짜코드", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>날짜</label>
          <Input
            style={inputStyle}
            value={form.날짜}
            onChange={(e) => handleChange("날짜", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>년도</label>
          <Input
            style={inputStyle}
            value={form.년도}
            onChange={(e) => handleChange("년도", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>분기</label>
          <Input
            style={inputStyle}
            value={form.분기}
            onChange={(e) => handleChange("분기", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>월</label>
          <Input
            style={inputStyle}
            value={form.월}
            onChange={(e) => handleChange("월", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>월(영문)</label>
          <Input
            style={inputStyle}
            value={form.월영문}
            onChange={(e) => handleChange("월영문", e.target.value)}
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

export default DateModal;
