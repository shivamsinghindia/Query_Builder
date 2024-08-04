import React, { useState } from "react";
import QueryBuilder, { Rule, ConditionType } from "../queryBuilder";

interface Filter {
  field: string;
  operator: ConditionType;
  value: string | number | boolean;
}

interface Group {
  logicOperator: "AND" | "OR";
  filters: Filter[];
}

const QueryBuilderUI: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([
    { logicOperator: "AND", filters: [{ field: "", operator: "equals", value: "" }] }
  ]);
  const [query, setQuery] = useState<string>("");
  const [rules, setRules] = useState<Rule[]>([]);
  const queryBuilder = new QueryBuilder();

  const handleAddFilter = (groupIndex: number) => {
    const newGroups = [...groups];
    newGroups[groupIndex].filters.push({ field: "", operator: "equals", value: "" });
    setGroups(newGroups);
  };

  const handleAddGroup = () => {
    setGroups([...groups, { logicOperator: "AND", filters: [{ field: "", operator: "equals", value: "" }] }]);
  };

  const handleChange = (
    groupIndex: number,
    filterIndex: number,
    key: "field" | "operator" | "value",
    value: string | ConditionType
  ) => {
    const newGroups = [...groups];
    (newGroups[groupIndex].filters[filterIndex] as any)[key] = value;
    setGroups(newGroups);
  };

  const handleLogicOperatorChange = (groupIndex: number, logicOperator: "AND" | "OR") => {
    const newGroups = [...groups];
    newGroups[groupIndex].logicOperator = logicOperator;
    setGroups(newGroups);
  };

  const handleAddCondition = () => {
    queryBuilder.clear(); 
    groups.forEach(group => {
      group.filters.forEach(filter => {
        queryBuilder.addCondition({ field: filter.field, operator: filter.operator, value: filter.value }, group.logicOperator);
      });
    });
    setQuery(queryBuilder.getQueryString());
    setRules(queryBuilder.getQueryObject());
  };

  const handleClearQuery = () => {
    setGroups([{ logicOperator: "AND", filters: [{ field: "", operator: "equals", value: "" }] }]);
    setQuery("");
    setRules([]);
    queryBuilder.clear();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="w-4/5 bg-gray-800 rounded-lg border border-gray-700 p-6 m-4 pb-16">
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-2">Build your query</h1>
          <div className="bg-gray-700 p-2 rounded">{query}</div>
        </div>
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-5">
            <div className="flex items-center mb-2">
              <select
                className="mr-2 p-2 bg-gray-700 text-white border border-gray-600 rounded"
                value={group.logicOperator}
                onChange={(e) => handleLogicOperatorChange(groupIndex, e.target.value as "AND" | "OR")}
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
              <button
                className="p-2 bg-[#3f1267] text-white rounded hover:bg-purple-500"
                onClick={handleAddGroup}
              >
                + Add new group filter
              </button>
            </div>
            {group.filters.map((filter, filterIndex) => (
              <div key={filterIndex} className="mb-2">
                <select
                  className="mr-2 p-2 bg-gray-700 text-white border border-gray-600 rounded"
                  value={filter.field}
                  onChange={(e) => handleChange(groupIndex, filterIndex, "field", e.target.value)}
                >
                  <option value="">Select field</option>
                  <option value="theme">Theme</option>
                  <option value="sub-theme">Sub-theme</option>
                  <option value="reason">Reason</option>
                  <option value="language">Language</option>
                  <option value="source">Source</option>
                  <option value="rating">Rating</option>
                  <option value="time-period">Time Period</option>
                  <option value="customer-id">Customer ID</option>
                </select>
                <select
                  className="mr-2 p-2 bg-gray-700 text-white border border-gray-600 rounded"
                  value={filter.operator}
                  onChange={(e) => handleChange(groupIndex, filterIndex, "operator", e.target.value as ConditionType)}
                >
                  <option value="equals">Equals</option>
                  <option value="greaterThan">Greater Than</option>
                  <option value="lessThan">Less Than</option>
                  <option value="contains">Contains</option>
                </select>
                <input
                  type="text"
                  className="mr-2 p-2 bg-gray-700 text-white border border-gray-600 rounded"
                  placeholder="Select criteria"
                  value={String(filter.value)}
                  onChange={(e) => handleChange(groupIndex, filterIndex, "value", e.target.value)}
                />
                <button
                  className="p-2 bg-[#3f1267] text-white rounded hover:bg-purple-500"
                  onClick={() => handleAddFilter(groupIndex)}
                >
                  + Add filter
                </button>
              </div>
            ))}
          </div>
        ))}
        <div className="flex gap-2">
          <button
            className="p-2 bg-[#3f1267] text-white rounded hover:bg-purple-500"
            onClick={handleAddCondition}
          >
            Build Query
          </button>
          <button
            className="p-2 bg-red-600 text-white rounded hover:bg-red-500"
            onClick={handleClearQuery}
          >
            Clear Query
          </button>
          <button className="p-2 bg-[#3f1267] text-white rounded hover:bg-purple-500">
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryBuilderUI;
