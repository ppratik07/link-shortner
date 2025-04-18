export const Stats = () => {
    const stats = [
      { value: "10M+", label: "Links Shortened" },
      { value: "50K+", label: "Active Users" },
      { value: "99.9%", label: "Uptime" },
      { value: "150+", label: "Countries" },
    ];
  
    return (
      <div className="bg-gradient-to-r from-purple-600 to-blue-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="text-4xl font-bold text-white mb-2">{stat.value}</dt>
                <dd className="text-purple-100">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    );
  };