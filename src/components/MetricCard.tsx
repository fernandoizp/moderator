import { MetricKey } from '../types';
import { formatMetric, toTitleCase } from '../utils/helpers';

interface MetricCardProps {
  metric: MetricKey;
  value: number;
}

export const MetricCard = ({ metric, value }: MetricCardProps) => {
  const tone = value >= 65 ? 'high' : value <= 35 ? 'low' : 'mid';
  return (
    <div className={`metric-card metric-card--${tone}`}>
      <span className="metric-card__label">{toTitleCase(metric)}</span>
      <strong className="metric-card__value">{formatMetric(value)}</strong>
    </div>
  );
};
