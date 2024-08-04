export type ConditionType = "equals" | "greaterThan" | "lessThan" | "contains";

export interface Condition {
  field: string;
  operator: ConditionType;
  value: string | number | boolean;
}

export interface Rule {
  conditions: Condition[];
  operator: "AND" | "OR";
}

class QueryBuilder {
  private rules: Rule[] = [];

  addCondition(condition: Condition, operator: "AND" | "OR" = "AND") {
    const lastRule = this.rules[this.rules.length - 1];
    if (lastRule && lastRule.operator === operator) {
      lastRule.conditions.push(condition);
    } else {
      this.rules.push({ conditions: [condition], operator });
    }
  }

  getQueryString(): string {
    return this.rules
      .map(
        (rule) =>
          `(${rule.conditions
            .map((cond) => `${cond.field} ${this.getOperatorString(cond.operator)} "${cond.value}"`)
            .join(` ${this.getLogicOperatorString(rule.operator)} `)})`
      )
      .join(" && ");
  }

  getQueryObject(): Rule[] {
    return this.rules;
  }

  clear() {
    this.rules = [];
  }

  private getOperatorString(operator: ConditionType): string {
    switch (operator) {
      case "equals":
        return "==";
      case "greaterThan":
        return ">";
      case "lessThan":
        return "<";
      case "contains":
        return "contains";
      default:
        return "";
    }
  }

  private getLogicOperatorString(operator: "AND" | "OR"): string {
    switch (operator) {
      case "AND":
        return "&&";
      case "OR":
        return "||";
      default:
        return "";
    }
  }
}

export default QueryBuilder;
