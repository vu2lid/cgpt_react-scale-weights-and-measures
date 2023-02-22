import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ConversionPopup = () => {
  const [value, setValue] = useState('1');
  const [sourceUnit, setSourceUnit] = useState('kg');
  const [targetUnit, setTargetUnit] = useState('lbs');
  const [scaleFactor, setScaleFactor] = useState('1');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleSourceUnitChange = (event) => {
    setSourceUnit(event.target.value);
  };

  const handleTargetUnitChange = (event) => {
    setTargetUnit(event.target.value);
  };

  const handleScaleFactorChange = (event) => {
    setScaleFactor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      axios.get(`http://localhost:4000/scaleWeightsAndMeasures?quantity=${value}&fromUnit=${sourceUnit}&toUnit=${targetUnit}&scaleFactor=${scaleFactor}`)
        .then(response => {
          setResult(`${response.data.scaledValue}`);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [loading, value, sourceUnit, targetUnit, scaleFactor, result]);

  const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

  const Select = styled.select`
  margin-right: 10px;
  width: 100%;
  text-align: right;
`;

  const Input = styled.input`
  margin-right: 10px;
  width: 100%;
  text-align: right;
`;

  const Button = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
`;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Label>
          Value:
          <Input type="number" value={value} onChange={handleValueChange} />
        </Label>
        <br />
        <Label>
          Source Unit:
          <Select value={sourceUnit} onChange={handleSourceUnitChange}>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="lbs">lbs</option>
            <option value="oz">oz</option>
          </Select>
        </Label>
        <br />
        <Label>
          Target Unit:
          <Select value={targetUnit} onChange={handleTargetUnitChange}>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="lbs">lbs</option>
            <option value="oz">oz</option>
          </Select>
        </Label>
        <br />
        <Label>
          Scale Factor:
          <Input type="number" step="0.01" value={scaleFactor} onChange={handleScaleFactorChange} />
        </Label>
        <br />
        <Button type="submit">Convert</Button>
      </form>
      {(loading && <p>Converting...</p>) || (result && <p>{result}</p>) || (<p>&nbsp;</p>)}
    </div>
  );
};

export default ConversionPopup;
