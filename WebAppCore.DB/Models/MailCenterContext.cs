using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using WebAppCore.Tenant;

namespace WebAppCore.DB.Models
{
    public partial class MailCenterContext : DbContext
    {
        string _tenantid;
        public string TenantId
        {
            get
            {
                return this._tenantid;
            }
        }
        public MailCenterContext()
        {
        }

        public MailCenterContext(DbContextOptions<MailCenterContext> options, ITenantProvider tenantProvider)
            : base(options)
        {
            this._tenantid = tenantProvider.GetTenantId(); 
        }



        public virtual DbSet<McMailList> McMailList { get; set; }
        public virtual DbSet<McMailReceiveEnd> McMailReceiveEnd { get; set; }
        public virtual DbSet<McMailSendEnd> McMailSendEnd { get; set; }
        public virtual DbSet<McMailSendResult> McMailSendResult { get; set; }
        public virtual DbSet<McMailSendType> McMailSendType { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Database=MailCenter;Server=.;UID=sa;Password=sa;");
            }
            optionsBuilder.ReplaceService<IModelCacheKeyFactory, TenantModelFactory>();
            base.OnConfiguring(optionsBuilder);
        }
         

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            //Console.WriteLine(this._mailsendtypeid);

            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");


            modelBuilder.Entity<McMailList>(entity =>
            {
                entity.ToTable("MC_MailList");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.DisplayName)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.IsHtml)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.MailBody).HasColumnType("text");

                entity.Property(e => e.MailSendEndId).HasColumnName("MailSendEndID");

                entity.Property(e => e.MailSendTypeId).HasColumnName("MailSendTypeID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");

                entity.Property(e => e.Subject)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.MailSendEnd)
                    .WithMany(p => p.McMailList)
                    .HasForeignKey(d => d.MailSendEndId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MC_MAILL_MAIL_REF__MC_MAILS3");

                entity.HasOne(d => d.MailSendType)
                    .WithMany(p => p.McMailList)
                    .HasForeignKey(d => d.MailSendTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MC_MAILL_MAIL_REF__MC_MAILS2");

                int t;
                if (int.TryParse(this._tenantid, out t) == true)
                {
                    entity.HasQueryFilter(b => EF.Property<int>(b, "MailSendTypeId") == t);
                }

            });

            modelBuilder.Entity<McMailReceiveEnd>(entity =>
            {
                entity.ToTable("MC_MailReceiveEnd");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.MailId).HasColumnName("MailID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SendType).HasDefaultValueSql("((1))");

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");

                entity.HasOne(d => d.Mail)
                    .WithMany(p => p.McMailReceiveEnd)
                    .HasForeignKey(d => d.MailId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MC_MAILR_REEND_REF_MC_MAILL");
            });

            modelBuilder.Entity<McMailSendEnd>(entity =>
            {
                entity.ToTable("MC_MailSendEnd");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Host)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<McMailSendResult>(entity =>
            {
                entity.ToTable("MC_MailSendResult");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.BccdestinationMail)
                    .HasColumnName("BCCDestinationMail")
                    .HasMaxLength(2000)
                    .IsUnicode(false);

                entity.Property(e => e.CcdestinationMail)
                    .HasColumnName("CCDestinationMail")
                    .HasMaxLength(2000)
                    .IsUnicode(false);

                entity.Property(e => e.DestinationMail)
                    .IsRequired()
                    .HasMaxLength(2000)
                    .IsUnicode(false);

                entity.Property(e => e.DisplayName)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Host)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.IsHtml)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.MailBody).HasColumnType("text");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SendTime).HasColumnType("datetime");

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");

                entity.Property(e => e.Subject)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<McMailSendType>(entity =>
            {
                entity.ToTable("MC_MailSendType");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
            base.OnModelCreating(modelBuilder);
        }
    }
}
