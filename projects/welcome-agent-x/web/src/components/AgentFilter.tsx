type AgentFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export function AgentFilter({ value, onChange }: AgentFilterProps) {
  return (
    <div className="team__filter">
      <label className="team__filter-label" htmlFor="agent-filter">
        Filter by specialty
      </label>
      <div className="team__filter-row">
        <input
          id="agent-filter"
          className="team__filter-input"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Filter by specialty…"
          autoComplete="off"
        />
        {value ? (
          <button
            type="button"
            className="team__filter-clear"
            onClick={() => onChange('')}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
