using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using WebAppCore.Tenant;

namespace WebAppCore.DB.Models
{
    public partial class MailCenterContext : DbContext
    {
        private string _tenantid;
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
            modelBuilder.Entity<McMailList>(entity =>
            {
                entity.ToTable("MC_MailList");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.DisplayName)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.MailBody).HasColumnType("text");

                entity.Property(e => e.MailSendEndId).HasColumnName("MailSendEndID");

                entity.Property(e => e.MailSendTypeId).HasColumnName("MailSendTypeID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Subject)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.MailSendEnd)
                    .WithMany(p => p.McMailList)
                    .HasForeignKey(d => d.MailSendEndId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MC_MailList_MC_MailSendEnd");

                entity.HasOne(d => d.MailSendType)
                    .WithMany(p => p.McMailList)
                    .HasForeignKey(d => d.MailSendTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MC_MailList_MC_MailSendType");

                int t;
                if (int.TryParse(this._tenantid, out t) == true)
                {
                    entity.HasQueryFilter(b => EF.Property<int>(b, "MailSendTypeId") == t);
                }
            });

            modelBuilder.Entity<McMailReceiveEnd>(entity =>
            {
                entity.ToTable("MC_MailReceiveEnd");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.MailId).HasColumnName("MailID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Mail)
                    .WithMany(p => p.McMailReceiveEnd)
                    .HasForeignKey(d => d.MailId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MC_MailReceiveEnd_MC_MailList");
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

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<McMailSendResult>(entity =>
            {
                entity.ToTable("MC_MailSendResult");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

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

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            this.SetEntityTenantid();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        public override int SaveChanges()
        {
            this.SetEntityTenantid();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            this.SetEntityTenantid();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            this.SetEntityTenantid();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        private void SetEntityTenantid()
        {
            int t;
            if (int.TryParse(this._tenantid, out t) == false)
            {
                t = 0;
            }
            ChangeTracker.DetectChanges();
            var entities = ChangeTracker.Entries().Where(e => e.State == EntityState.Added && e.Entity.GetType() == typeof(McMailList));
            foreach (var item in entities)
            {
                (item.Entity as McMailList).MailSendTypeId = t;
            }
        }
    }
}
