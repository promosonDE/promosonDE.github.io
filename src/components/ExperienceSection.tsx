import { useState } from 'react'

const experiences = [
  {
    title: 'Senior Data Engineer',
    company: 'Elevance Health',
    location: 'Indianapolis, IN',
    period: 'May 2024 – Present',
    icon: '🏥',
    color: '#4AEDD9',
    level: 'LVL 6',
    xp: '95%',
    description: 'Enterprise Healthcare Data Modernization team, designing a scalable healthcare lakehouse platform supporting 120M+ claims records daily.',
    achievements: [
      'Designed scalable healthcare lakehouse platform using Azure Data Lake Gen2, Azure Databricks, Delta Lake, and Snowflake',
      'Re-engineered fragmented ingestion workflows into standardized Bronze/Silver/Gold architecture, improving data freshness by 35%',
      'Optimized large-scale PySpark workloads, reducing pipeline runtime by 35-40%',
      'Enhanced Snowflake performance reducing annual warehouse spend by 25-30%',
      'Improved production reliability, reducing recurring pipeline failures by 40%',
      'Supported AI/ML and RAG pipeline initiatives with governed, curated datasets',
      'Implemented real-time validation workflows using Azure Event Grid and Azure Functions',
      'Automated infrastructure provisioning using Terraform and CI/CD pipelines',
      'Mentored data engineers through architecture reviews and optimization sessions',
    ],
    tech: ['Azure Data Factory', 'Azure Databricks', 'Snowflake', 'Delta Lake', 'PySpark', 'dbt', 'Terraform', 'Power BI', 'Great Expectations', 'AWS S3'],
  },
  {
    title: 'Data Engineer',
    company: 'MetLife',
    location: 'New York City, NY',
    period: 'Mar 2023 – Apr 2024',
    icon: '🛡️',
    color: '#FCDB05',
    level: 'LVL 5',
    xp: '80%',
    description: 'Insurance data platform team modernizing policy, claims, underwriting, actuarial, and customer analytics data pipelines.',
    achievements: [
      'Developed ingestion pipelines for policy, claims, billing, and underwriting datasets using AWS Glue, S3, PySpark',
      'Re-engineered legacy SSIS workflows into scalable PySpark transformation jobs',
      'Built structured data lake zones for raw, enriched, and curated datasets',
      'Created transformation logic in Databricks using Delta Lake and merge patterns',
      'Developed modular dbt models for curated data marts',
      'Supported event-driven data processing using Kinesis and Lambda',
      'Created SQL-based datasets for Power BI and Tableau dashboards',
      'Prepared datasets to support AI/ML fraud analytics and risk scoring',
    ],
    tech: ['AWS Glue', 'Amazon S3', 'Kinesis', 'Lambda', 'Redshift', 'Snowflake', 'Databricks', 'Delta Lake', 'Airflow', 'Terraform', 'dbt', 'PySpark'],
  },
  {
    title: 'ETL Developer',
    company: 'Home Depot',
    location: 'Atlanta, GA',
    period: 'Sept 2019 – Feb 2023',
    icon: '🏠',
    color: '#17DD62',
    level: 'LVL 3',
    xp: '70%',
    description: 'Retail Data and Supply Chain Analytics team, supporting ETL development for sales, inventory, merchandising, pricing, and supplier datasets.',
    achievements: [
      'Developed and maintained ETL workflows using Informatica PowerCenter, SSIS, SQL Server, Oracle, Teradata',
      'Created source-to-target mappings, transformation logic, and data validation checks',
      'Built SQL-based transformation logic using T-SQL, PL/SQL, stored procedures',
      'Supported performance tuning of ETL jobs and optimized joins',
      'Implemented SCD Type 1 and Type 2 logic for dimension tables',
      'Created reconciliation scripts using SQL and Shell Scripting',
      'Assisted in building star schema and snowflake schema structures',
      'Supported report-ready datasets for SSRS, Crystal Reports, Power BI',
    ],
    tech: ['Informatica PowerCenter', 'SSIS', 'SQL Server', 'Oracle', 'Teradata', 'PL/SQL', 'Bash', 'Crystal Reports', 'SSRS', 'SCD', 'TFS'],
  },
]

export default function ExperienceSection() {
  const [expandedIdx, setExpandedIdx] = useState(0)

  return (
    <section id="experience" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#2a1a1a] to-[#1a1a2e]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="pixel-font text-xl sm:text-2xl text-[#FCDB05] mb-4 drop-shadow-[2px_2px_0px_#3C3C3C]">
            ⚔️ Quest Log
          </h2>
          <p className="text-gray-400 text-lg">Professional Experience</p>
          <div className="w-32 h-1 bg-[#FCDB05] mx-auto mt-4" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 timeline-line transform md:-translate-x-1/2" />

          {experiences.map((exp, idx) => (
            <div key={idx} className={`relative mb-12 md:mb-16 ${idx % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'}`}>
              {/* Timeline dot */}
              <div 
                className="absolute left-4 md:left-1/2 w-5 h-5 border-2 transform md:-translate-x-1/2 z-10"
                style={{ 
                  backgroundColor: exp.color,
                  borderColor: exp.color,
                  boxShadow: `0 0 10px ${exp.color}`
                }}
              />

              {/* Quest card */}
              <div 
                className={`ml-12 md:ml-0 mc-panel mc-block cursor-pointer ${idx % 2 === 0 ? 'md:mr-4' : 'md:ml-4'}`}
                onClick={() => setExpandedIdx(expandedIdx === idx ? -1 : idx)}
              >
                {/* Quest header */}
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className="w-12 h-12 flex items-center justify-center border-2 text-2xl shrink-0"
                    style={{ backgroundColor: `${exp.color}20`, borderColor: exp.color }}
                  >
                    {exp.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="pixel-font text-xs sm:text-sm" style={{ color: exp.color }}>
                      {exp.title}
                    </h3>
                    <p className="text-white text-lg font-bold">{exp.company}</p>
                    <p className="text-gray-400 text-sm">{exp.location} • {exp.period}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="pixel-font text-[10px]" style={{ color: exp.color }}>{exp.level}</span>
                    <div className="w-16 xp-bar mt-1">
                      <div className="xp-bar-fill" style={{ width: exp.xp }} />
                    </div>
                  </div>
                </div>

                {/* Quest description */}
                <p className="text-gray-300 text-base mb-3">{exp.description}</p>

                {/* Expanded content */}
                {expandedIdx === idx && (
                  <div className="mt-4 pt-4 border-t border-[#5A5A5A]">
                    <h4 className="pixel-font text-[10px] text-[#FCDB05] mb-3">📋 Quest Objectives:</h4>
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, aidx) => (
                        <li key={aidx} className="flex items-start gap-2 text-gray-300 text-base">
                          <span className="text-[#17DD62] mt-0.5">✦</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    <div className="mt-4 pt-3 border-t border-[#5A5A5A]">
                      <h4 className="pixel-font text-[10px] text-gray-400 mb-2">🔧 Loot Drops:</h4>
                      <div className="flex flex-wrap gap-1">
                        {exp.tech.map((t, tidx) => (
                          <span 
                            key={tidx} 
                            className="text-xs px-2 py-1 border"
                            style={{ 
                              backgroundColor: `${exp.color}15`, 
                              borderColor: `${exp.color}40`,
                              color: exp.color 
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Click indicator */}
                <div className="text-center mt-2">
                  <span className="pixel-font text-[8px] text-gray-500">
                    {expandedIdx === idx ? '▲ Click to collapse ▲' : '▼ Click to expand ▼'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
