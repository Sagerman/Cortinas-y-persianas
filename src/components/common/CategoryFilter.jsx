import { CATEGORIES } from '../../utils/sampleData';

export default function CategoryFilter({ active, onChange }) {
  const allCategories = [{ id: 'all', name: 'Todos', icon: '✨' }, ...CATEGORIES];

  return (
    <div className="category-filter" id="category-filter">
      {allCategories.map(cat => (
        <button
          key={cat.id}
          className={`category-pill ${active === cat.id ? 'active' : ''}`}
          onClick={() => onChange(cat.id)}
        >
          <span style={{ marginRight: '6px' }}>{cat.icon}</span>
          {cat.name}
        </button>
      ))}
    </div>
  );
}
