using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users")
                .HasKey(u => u.Id);

            builder.Property(u => u.PictureUrl)
                .IsRequired();

            builder.Property(u => u.FullName)
                .IsRequired();

            builder.Property(u => u.Email)
                .IsRequired();
            builder.HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}
