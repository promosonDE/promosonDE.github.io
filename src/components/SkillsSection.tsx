import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const skillCategories = [
  {
    name: '☁️ Cloud Platforms',
    color: '#4AEDD9',
    icon: '☁️',
    skills: ['Azure Data Factory', 'Azure Databricks', 'Synapse Analytics', 'ADLS Gen2', 'Azure Functions', 'AWS Glue', 'Amazon S3', 'Amazon Redshift', 'GCP BigQuery', 'Cloud Storage', 'Pub/Sub', 'Dataproc', 'Dataflow', 'Lambda', 'Kinesis']
  },
  {
    name: '🏗️ Data Warehousing',
    color: '#FCDB05',
    icon: '🏗️',
    skills: ['Snowflake', 'Redshift', 'Synapse Analytics', 'BigQuery', 'SQL Server', 'Oracle', 'Teradata']
  },
  {
    name: '🔷 Lakehouse',
    color: '#4AEDD9',
    icon: '🔷',
    skills: ['Azure Databricks', 'Delta Lake', 'Delta Live Tables', 'Databricks Workflows', 'Unity Catalog', 'Feature Store', 'Medallion Architecture', 'Bronze/Silver/Gold']
  },
  {
    name: '⚙️ ETL/ELT Tools',
    color: '#17DD62',
    icon: '⚙️',
    skills: ['Azure Data Factory', 'AWS Glue', 'Apache Airflow', 'dbt', 'Informatica', 'SSIS', 'CDC', 'Autoloader']
  },
  {
    name: '🐍 Languages',
    color: '#FCDB05',
    icon: '🐍',
    skills: ['Python', 'SQL', 'PySpark', 'Spark SQL', 'T-SQL', 'PL/SQL', 'Bash', 'Shell Scripting', 'Scala']
  },
  {
    name: '🔥 Big Data',
    color: '#B02E26',
    icon: '🔥',
    skills: ['Apache Spark', 'PySpark', 'Databricks', 'Dataproc', 'EMR', 'Distributed Processing', 'Partitioning', 'Performance Tuning']
  },
  {
    name: '📡 Streaming',
    color: '#4AEDD9',
    icon: '📡',
    skills: ['Apache Kafka', 'Kinesis', 'Event Hubs', 'Pub/Sub', 'Spark Structured Streaming', 'Micro Batch', 'Event-Driven Architecture']
  },
  {
    name: '🗄️ Databases',
    color: '#17DD62',
    icon: '🗄️',
    skills: ['PostgreSQL', 'MySQL', 'SQL Server', 'Oracle', 'MongoDB', 'Redis', 'DynamoDB', 'Azure SQL']
  },
  {
    name: '📐 Data Modeling',
    color: '#FCDB05',
    icon: '📐',
    skills: ['Dimensional Modeling', 'Star Schema', 'Snowflake Schema', 'SCD Type 2', 'Data Vault', 'Fact/Dimension Tables', 'Schema Evolution']
  },
  {
    name: '🔒 Governance',
    color: '#B02E26',
    icon: '🔒',
    skills: ['Microsoft Purview', 'Unity Catalog', 'Lake Formation', 'Data Lineage', 'RBAC', 'PII Protection', 'Encryption', 'Dynamic Masking']
  },
  {
    name: '✅ Data Quality',
    color: '#17DD62',
    icon: '✅',
    skills: ['Great Expectations', 'Data Profiling', 'Reconciliation', 'Schema Validation', 'SLA Monitoring', 'Audit Logging']
  },
  {
    name: '🚀 DevOps/CI-CD',
    color: '#4AEDD9',
    icon: '🚀',
    skills: ['Azure DevOps', 'GitHub Actions', 'Git', 'Terraform', 'CI/CD Automation', 'Databricks Repos', 'Version Control']
  },
  {
    name: '🤖 AI/ML Support',
    color: '#FCDB05',
    icon: '🤖',
    skills: ['Feature Engineering', 'Feature Store', 'RAG Pipelines', 'Vector Search', 'Semantic Retrieval', 'ML-Ready Datasets', 'Model Pipelines']
  },
  {
    name: '📊 BI Tools',
    color: '#17DD62',
    icon: '📊',
    skills: ['Power BI', 'Tableau', 'Looker Studio', 'Excel', 'Executive Dashboards', 'KPI Reporting', 'Self-Service Analytics']
  },
]

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const titleAnim = useScrollAnimation()
  const inventoryAnim = useScrollAnimation({ threshold: 0.05 })
  const matrixAnim = useScrollAnimation({ threshold: 0.05 })

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-[#1a1a2e]/70 backdrop-blur-[0.5px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <div 
          ref={titleAnim.ref}
          className="text-center mb-12 scroll-animate-up"
        >
          <h2 className="pixel-font text-xl sm:text-2xl text-[#FCDB05] mb-4 drop-shadow-[2px_2px_0px_#3C3C3C]">
            🎒 Inventory
          </h2>
          <p className="text-gray-400 text-lg">Technical Skills & Tools</p>
          <div className="w-32 h-1 bg-[#FCDB05] mx-auto mt-4" />
        </div>

        {/* Inventory Grid */}
        <div 
          ref={inventoryAnim.ref}
          className="mc-panel scroll-animate-up"
        >
          {/* Category tabs - responsive */}
          <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b-2 border-[#5A5A5A]">
            {skillCategories.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveCategory(idx)}
                aria-pressed={activeCategory === idx}
                aria-label={`Show ${cat.name.replace(/^[^\s]+\s/, '')} skills`}
                title={cat.name.replace(/^[^\s]+\s/, '')}
                className={`px-2 sm:px-3 py-2 text-xs sm:text-sm border-2 transition-all duration-300 ${
                  activeCategory === idx
                    ? 'bg-[#4A7A2E] border-[#6BAF4A] text-white scale-105 shadow-lg shadow-[#4A7A2E]/30'
                    : 'bg-[#3C3C3C] border-[#5A5A5A] text-gray-400 hover:bg-[#4A4A4A] hover:border-[#7F7F7F]'
                }`}
              >
                <span className="mr-1">{cat.icon}</span>
                <span className="hidden sm:inline">{cat.name.replace(/^[^\s]+\s/, '')}</span>
              </button>
            ))}
          </div>

          {/* Active category content */}
          <div className="min-h-[200px]">
            <h3 className="pixel-font text-xs sm:text-sm mb-4 transition-all duration-300" style={{ color: skillCategories[activeCategory].color }}>
              {skillCategories[activeCategory].name}
            </h3>
            
            {/* Skill items in inventory grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
              {skillCategories[activeCategory].skills.map((skill, idx) => (
                <div
                  key={`${activeCategory}-${idx}`}
                  className="mc-slot mc-block group scroll-animate-scale"
                  title={skill}
                  style={{ 
                    animationDelay: `${idx * 0.05}s`,
                    opacity: 1,
                    transform: 'scale(1)',
                  }}
                >
                  <span className="text-xs sm:text-sm text-center text-gray-200 group-hover:text-white transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hotbar - All categories overview */}
          <div className="mt-8 pt-4 border-t-2 border-[#5A5A5A]">
            <p className="pixel-font text-[10px] text-gray-400 mb-3">All Categories:</p>
            <div className="flex flex-wrap gap-3">
              {skillCategories.map((cat, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <div 
                    className="w-3 h-3 transition-transform hover:scale-150" 
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-xs text-gray-400">{cat.skills.length}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full skills grid - compact view */}
        <div 
          ref={matrixAnim.ref}
          className="mt-8 mc-panel scroll-animate-up"
        >
          <h3 className="pixel-font text-xs text-[#FCDB05] mb-4">📋 Complete Skill Matrix</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {skillCategories.map((cat, idx) => (
              <div 
                key={idx} 
                className="bg-[#2C2C2C] border border-[#5A5A5A] p-3 transition-all duration-300 hover:border-[#7F7F7F] hover:bg-[#353535] scroll-animate-up"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-xs sm:text-sm font-bold" style={{ color: cat.color }}>{cat.name}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {cat.skills.map((skill, sidx) => (
                    <span 
                      key={sidx} 
                      className="text-xs bg-[#3C3C3C] px-2 py-0.5 text-gray-300 border border-[#5A5A5A] transition-all hover:bg-[#4A4A4A] hover:border-[#7F7F7F]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
