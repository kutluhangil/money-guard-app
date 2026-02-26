import Chart from "../../components/Chart/Chart";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import css from "./StatisticsTab.module.css";

const StatisticsTab = () => {
  return (
    <div>
      <div className={css.container}>
        <div className={css.area}>
          {/* Chart only visible on mobile - hidden on tablet/desktop */}
          <div className={css.chartMobile}>
            <Chart />
          </div>
          <div>
            <StatisticsDashboard />
            <StatisticsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTab;
