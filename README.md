
```
# Query Builder Library

This is a React-based Query Builder Library that allows users to create complex queries using a user-friendly interface. It exposes an API to get the query output in two formats: a string representation and a Rule object.

## Features

- Add filters and groups to build complex queries.
- Support for different conditions and fields.
- Get query output as a string or a Rule object.
- Clear the query to start over.

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/query-builder.git
cd query-builder
npm install
```

## Running the Development Server

To run the development server, use the following command:

```bash
npm start
```

You can view the application in your browser at `http://localhost:3000`.

## Building for Production

To create a production build, use the following command:

```bash
npm run build
```

## Usage

### QueryBuilder Component

The `QueryBuilder` component provides the main functionality of the query builder. It allows users to add filters and groups, and build complex queries.

### QueryBuilderUI Component

The `QueryBuilderUI` component is a higher-level component that uses the `QueryBuilder` component and provides a user interface for building queries.

### Example

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import QueryBuilderUI from './components/QueryBuilderUI';

ReactDOM.render(<QueryBuilderUI />, document.getElementById('root'));
```

### QueryBuilder API

The `QueryBuilder` class provides methods to add conditions and get the query output in different formats.

#### Methods

- `addCondition(condition: Condition, logicOperator: "AND" | "OR")`: Adds a new condition to the query.
- `getQueryString(): string`: Returns the query as a string.
- `getQueryObject(): Rule[]`: Returns the query as a Rule object.
- `clear()`: Clears all conditions from the query.

### Example Usage

```typescript
import QueryBuilder, { ConditionType } from './queryBuilder';

const queryBuilder = new QueryBuilder();

queryBuilder.addCondition(
  { field: 'Language', operator: 'equals', value: 'Telugu' },
  'AND'
);
queryBuilder.addCondition(
  { field: 'Theme', operator: 'equals', value: 'sex' },
  'OR'
);

const queryString = queryBuilder.getQueryString();
const queryObject = queryBuilder.getQueryObject();

console.log(queryString); // Outputs: (Language equals Telugu AND Theme equals sex)
console.log(queryObject); // Outputs: [{ field: 'Language', operator: 'equals', value: 'Telugu' }, { field: 'Theme', operator: 'equals', value: 'sex' }]
```

### Clearing the Query

The `QueryBuilderUI` component provides a "Clear Query" button that allows users to reset the query builder to its initial state.

### Example

```typescript
const handleClearQuery = () => {
  setGroups([{ logicOperator: "AND", filters: [{ field: "", operator: "equals", value: "" }] }]);
  setQuery("");
  setRules([]);
  queryBuilder.clear();
};
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or improvements.

## License

This project is licensed under the MIT License.
```

This `README.md` provides clear and comprehensive instructions and examples for using the Query Builder Library, including features, installation, running the development server, building for production, usage examples, and how to clear the query.