import { useDashboard } from "../../hooks/useDashboard";

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return <div>Loading Dashboard...</div>;
  }

  if (!data) {
    return <div>Unable to load dashboard.</div>;
  }

  const overview = data.overview;

  const cards = [
    {
      title: "Products",
      value: overview.totalProducts,
    },
    {
      title: "Customers",
      value: overview.totalCustomers,
    },
    {
      title: "Licenses",
      value: overview.totalLicenses,
    },
    {
      title: "Users",
      value: overview.totalUsers,
    },
    {
      title: "Active",
      value: overview.activeLicenses,
    },
    {
      title: "Expired",
      value: overview.expiredLicenses,
    },
    {
      title: "Suspended",
      value: overview.suspendedLicenses,
    },
    {
      title: "Devices",
      value: overview.totalDevices,
    },
  ];

  return (
    <div>

      <h1 className="mb-8 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl bg-white p-6 shadow-sm"
          >
            <div className="text-slate-500">
              {card.title}
            </div>

            <div className="mt-3 text-4xl font-bold">
              {card.value}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}