import { App } from './App';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

//import { ChangeMode } from './components/ChangeMode';

describe('App', () => {
  let app;

  beforeEach(() => {
    jest.useFakeTimers();
    app = render(<App />);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('App testing changeMode', () => {
    expect(app.getByTestId('app')).toHaveClass('app-dark');
    fireEvent.click(app.getByTestId('btn'));
    expect(app.getByTestId('app')).toHaveClass('app-light');
  });

  it('App testing changeName funct', () => {
    fireEvent.change(app.getByPlaceholderText('Your new name'), {
      target: { value: 'NewName' },
    });
    fireEvent.click(app.getByText('Change'));
    expect(app.getByTestId('greetings')).toHaveTextContent('Hello, NewName!');
  });

  it('App testing BOT answer', () => {
    fireEvent.change(app.getByPlaceholderText('Type your message'), {
      target: { value: 'message' },
    });
    fireEvent.submit(app.getByTestId('addmessage'));
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(app.getByTestId('messagelist').lastChild).toContainHTML(
      '<li>Bot: Hey, my name is Bot! I can type this message!</li>'
    );
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(app.getByTestId('messagelist')).toContainHTML(
      '<ul data-testid="messagelist"><li>Max: message</li><li>Bot: Hey, my name is Bot! I can type this message!</li></ul>'
    );
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.change(app.getByPlaceholderText('Type your message'), {
      target: { value: 'message' },
    });
    fireEvent.submit(app.getByTestId('addmessage'));
    fireEvent.change(app.getByPlaceholderText('Type your message'), {
      target: { value: 'message' },
    });
    fireEvent.submit(app.getByTestId('addmessage'));
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(app.getByTestId('messagelist')).toContainHTML(
      '<ul data-testid="messagelist"><li>Max: message</li><li>Bot: Hey, my name is Bot! I can type this message!</li><li>Max: message</li><li>Max: message</li><li>Bot: Hey, my name is Bot! I can type this message!</li></ul>'
    );
  });
});