using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebAppCore.DB.Models
{
    public partial class ClubContext : DbContext
    {

        public static string ConStr = "";
        public ClubContext()
        {
        }

        public ClubContext(DbContextOptions<ClubContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Access> Access { get; set; }
        public virtual DbSet<Action> Action { get; set; }
        public virtual DbSet<AttachMent> AttachMent { get; set; }
        public virtual DbSet<ChessScoreList> ChessScoreList { get; set; }
        public virtual DbSet<Fight> Fight { get; set; }
        public virtual DbSet<Member> Member { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<SystemScoreList> SystemScoreList { get; set; }

        // Unable to generate entity type for table 'dbo.UserLogin'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.Code'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //if (!optionsBuilder.IsConfigured)
            //{
            //    optionsBuilder.UseSqlServer("Database=Club;Server=.;UID=sa;Password=Abc,123.;");
            //}
            optionsBuilder.UseSqlServer(ConStr);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Access>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AccessMid).HasColumnName("AccessMID");

                entity.Property(e => e.AccessTime).HasColumnType("datetime");

                entity.Property(e => e.BaccessMid).HasColumnName("BAccessMID");
            });

            modelBuilder.Entity<Action>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Remark)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<AttachMent>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AddTime).HasColumnType("datetime");

                entity.Property(e => e.Address)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.MemberId).HasColumnName("MemberID");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Remark).HasColumnType("text");
            });

            modelBuilder.Entity<ChessScoreList>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AddTime).HasColumnType("datetime");

                entity.Property(e => e.FightId).HasColumnName("FightID");

                entity.Property(e => e.MemberId).HasColumnName("MemberID");
            });

            modelBuilder.Entity<Fight>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AddTime).HasColumnType("datetime");

                entity.Property(e => e.Remark)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Member>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Birth).HasColumnType("datetime");

                entity.Property(e => e.Login)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Remark).HasColumnType("text");

                entity.Property(e => e.Tel)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Ycaccount)
                    .HasColumnName("YCAccount")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<News>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AddTime).HasColumnType("datetime");

                entity.Property(e => e.KeyWord)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NewContent).HasColumnType("text");

                entity.Property(e => e.Title)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateTime).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            modelBuilder.Entity<SystemScoreList>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ActionId).HasColumnName("ActionID");

                entity.Property(e => e.AddTime).HasColumnType("datetime");

                entity.Property(e => e.MemberId).HasColumnName("MemberID");
            });
        }
    }
}
