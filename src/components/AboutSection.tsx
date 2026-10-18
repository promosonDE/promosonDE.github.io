import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function AboutSection() {
  const titleAnim = useScrollAnimation()
  const contentAnim = useScrollAnimation({ threshold: 0.05 })
  const statsAnim = useScrollAnimation({ threshold: 0.2 })

  return (
    <section id="about" className="py-20 px-4 relative">
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-[#1a1a2e]/60 backdrop-blur-[1px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <div 
          ref={titleAnim.ref}
          className="text-center mb-12 scroll-animate-up"
        >
          <h2 className="pixel-font text-xl sm:text-2xl text-[#FCDB05] mb-4 drop-shadow-[2px_2px_0px_#3C3C3C]">
            📜 Player Stats
          </h2>
          <div className="w-32 h-1 bg-[#FCDB05] mx-auto" />
        </div>

        {/* About Content - Book style */}
        <div 
          ref={contentAnim.ref}
          className="mc-panel max-w-4xl mx-auto scroll-animate-up"
        >
          {/* Book header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#5A5A5A]">
            <div className="w-10 h-10 bg-[#8B6914] border-2 border-[#6B4F12] flex items-center justify-center animate-wiggle">
              <span className="text-xl">📖</span>
            </div>
            <div>
              <h3 className="pixel-font text-xs text-[#FCDB05]">Professional Summary</h3>
              <p className="text-gray-400 text-sm">Class: Senior Data Engineer</p>
            </div>
          </div>

          {/* Summary text */}
          <div className="space-y-4 text-lg leading-relaxed text-gray-200">
            <p className="scroll-animate-up stagger-1">
              <span className="text-[#4AEDD9] inline-block animate-pulse">⚡</span> Accomplished and versatile <span className="text-[#FCDB05] font-bold">Senior Data Engineer</span> with <span className="text-[#17DD62] font-bold">6+ years</span> of experience architecting scalable, secure, and high-performance data platforms across <span className="text-[#4AEDD9]">healthcare, finance, insurance, and retail</span> domains.
            </p>
            <p className="scroll-animate-up stagger-2">
              <span className="text-[#4AEDD9] inline-block animate-pulse">⚡</span> Strong expertise in designing modern <span className="text-[#FCDB05] font-bold">cloud-native Lakehouse Architecture</span>, enterprise Data Warehouses, and analytics platforms using <span className="text-[#17DD62]">Azure Data Factory, Azure Databricks, Snowflake, Delta Lake, AWS Glue, Amazon S3, Amazon Redshift, GCP BigQuery</span>, and more.
            </p>
            <p className="scroll-animate-up stagger-3">
              <span className="text-[#4AEDD9] inline-block animate-pulse">⚡</span> Skilled in building <span className="text-[#FCDB05] font-bold">metadata-driven ETL/ELT Frameworks</span>, batch and real-time streaming pipelines, Data Integration solutions, and optimized Data Models that improve scalability, governance, Data Quality, Data Lineage, and regulatory compliance aligned with <span className="text-[#17DD62]">HIPAA, GDPR</span>, and enterprise security standards.
            </p>
            <p className="scroll-animate-up stagger-4">
              <span className="text-[#4AEDD9] inline-block animate-pulse">⚡</span> Experienced in developing <span className="text-[#FCDB05] font-bold">AI-ready data platforms</span> and supporting <span className="text-[#4AEDD9]">Generative AI and RAG Pipeline</span> use cases by preparing curated, governed, and analytics-ready datasets for Machine Learning, Vector Search, Semantic Retrieval, advanced analytics, and executive reporting.
            </p>
            <p className="scroll-animate-up stagger-5">
              <span className="text-[#4AEDD9] inline-block animate-pulse">⚡</span> Proficient in <span className="text-[#17DD62]">Python, SQL, PySpark, Apache Spark, Kafka, Airflow, dbt, Terraform, Git, Azure DevOps, CI/CD Automation</span>, and cloud-native monitoring tools to deliver reliable production-grade data solutions.
            </p>
          </div>

          {/* Stats row */}
          <div 
            ref={statsAnim.ref}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t-2 border-[#5A5A5A]"
          >
            {[
              { value: '6+', label: 'Years Exp', color: '#FCDB05' },
              { value: '3', label: 'Clouds', color: '#4AEDD9' },
              { value: '4', label: 'Domains', color: '#17DD62' },
              { value: '120M+', label: 'Daily Records', color: '#B02E26' },
            ].map((stat, idx) => (
              <div 
                key={idx}
                className={`text-center scroll-animate-scale stagger-${idx + 1}`}
              >
                <div className="pixel-font text-xl sm:text-2xl" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hearts / Health bar */}
        <div className="flex justify-center gap-1 mt-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <span 
              key={i} 
              className="heart text-lg animate-heartbeat"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              ❤️
            </span>
          ))}
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
