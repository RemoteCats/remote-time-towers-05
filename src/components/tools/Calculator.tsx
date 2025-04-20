
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator as CalculatorIcon } from 'lucide-react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);
  
  const clearAll = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };
  
  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };
  
  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };
  
  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);
    
    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }
    
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };
  
  const performCalculation = (): number => {
    const inputValue = parseFloat(display);
    
    if (firstOperand === null || operator === null) {
      return inputValue;
    }
    
    let result = 0;
    switch(operator) {
      case '+':
        result = firstOperand + inputValue;
        break;
      case '-':
        result = firstOperand - inputValue;
        break;
      case '*':
        result = firstOperand * inputValue;
        break;
      case '/':
        result = firstOperand / inputValue;
        break;
      default:
        return inputValue;
    }
    
    return result;
  };
  
  const handleEquals = () => {
    if (firstOperand === null || operator === null) {
      return;
    }
    
    const result = performCalculation();
    setDisplay(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };
  
  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };
  
  const calculatePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };
  
  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <CalculatorIcon className="mr-2 h-5 w-5" />
          Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-secondary p-4 mb-4 text-right rounded-md">
          <div className="text-2xl font-mono">{display}</div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" onClick={clearAll}>C</Button>
          <Button variant="outline" onClick={toggleSign}>+/-</Button>
          <Button variant="outline" onClick={calculatePercentage}>%</Button>
          <Button variant="secondary" onClick={() => handleOperator('/')}>/</Button>
          
          <Button variant="outline" onClick={() => inputDigit('7')}>7</Button>
          <Button variant="outline" onClick={() => inputDigit('8')}>8</Button>
          <Button variant="outline" onClick={() => inputDigit('9')}>9</Button>
          <Button variant="secondary" onClick={() => handleOperator('*')}>×</Button>
          
          <Button variant="outline" onClick={() => inputDigit('4')}>4</Button>
          <Button variant="outline" onClick={() => inputDigit('5')}>5</Button>
          <Button variant="outline" onClick={() => inputDigit('6')}>6</Button>
          <Button variant="secondary" onClick={() => handleOperator('-')}>-</Button>
          
          <Button variant="outline" onClick={() => inputDigit('1')}>1</Button>
          <Button variant="outline" onClick={() => inputDigit('2')}>2</Button>
          <Button variant="outline" onClick={() => inputDigit('3')}>3</Button>
          <Button variant="secondary" onClick={() => handleOperator('+')}>+</Button>
          
          <Button variant="outline" onClick={() => inputDigit('0')} className="col-span-2">0</Button>
          <Button variant="outline" onClick={inputDecimal}>.</Button>
          <Button variant="primary" onClick={handleEquals}>=</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;
