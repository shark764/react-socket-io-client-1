import * as React from 'react';
import faker from 'faker';

export const LogContext = React.createContext();

export function LogProvider({ children }) {
  const [entries, setEntries] = React.useState([]);

  function addEntry(evType = 'ws', text = '', data = null, type = 'info') {
    setEntries((allEntries) => [
      {
        id: faker.datatype.uuid(),
        evType,
        text,
        data,
        type,
        timestamp: new Date(),
      },
      ...allEntries,
    ]);
  }

  function clear() {
    setEntries([]);
  }

  return (
    <LogContext.Provider
      value={{ entries: [entries, setEntries], addEntry, clear }}
    >
      {children}
    </LogContext.Provider>
  );
}

export function useLogContext() {
  const context = React.useContext(LogContext);
  if (context === undefined) {
    throw new Error('useLogContext must be used within a LogProvider');
  }
  return context;
}
