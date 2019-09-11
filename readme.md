## .net core + ef core + ant design pro Demo
### 一个.net core + ef core + ant design pro 的例子

- **WebAppCore.DB**  
  ef core目录，版本为2.2.6，ef core不支持直接生成edmx文件，在使用nuget引用Microsoft.EntityFrameworkCore、Microsoft.EntityFrameworkCore.SqlServer、Microsoft.EntityFrameworkCore.Tools后，运行命令行生成
    ```bash
    Scaffold-DbContext "Data Source=.;Initial Catalog=Blogging;Integrated Security=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
    ```
    注意outputdir参数是输出的目录，最后不要带空格  
    **由于这个只是一个演示demo，不存在dao、service层，为方便开发，在部分字段属性加上了[Newtonsoft.Json.JsonIgnore]，避免json序列化时出现重复引用的问题。**  
    ***根据微软的要求，ef core2.2.6对sqlserver的支持需要在2008 R2 sp3以上，否则部署后时会报错***
    
&nbsp;

- **WebAppCore.MvcUI**  
    .net core目录，版本为2.2.0，几乎所有的配置都在Startup.cs这里，e.g.
    ```C#
    services.AddDbContext<DB.Models.MailCenterContext>(options =>{
	    options.UseSqlServer(Configuration.GetConnectionString("MailCenter"));
    }); 
    services.AddMvc()
	.SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
	.AddJsonOptions(opt=>
	{
		opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
		opt.SerializerSettings.ContractResolver = new DefaultContractResolver();
		opt.SerializerSettings.DateFormatString = "yyyy-MM-dd";
	});
    ```
    **MailCenter来自【appsettings.json】配置文件**  
    **context这里使用了Include（ThenInclude）方法，算比较实用，但会存在嵌套引用的问题，所以用到了[Newtonsoft.Json.JsonIgnore]**
    ```c#
    var list = this._mailCenterContext.McMailList.Include(x =>x.MailSendEnd).Include(x => x.MailSendType); 
    ```
    
&nbsp;

- **WebAppCore.UI**  
    前端目录，使用ant-design pro脚手架、umijs框架，具体可查看这些官网：[dvajs](https://dvajs.com/)、[umijs](https://umijs.org/zh/)、[ant-design](https://ant.design/index-cn)、[ant-design pro](https://pro.ant.design/index-cn/)。
    发布文件后，需要放到 ***WebAppCore.MvcUI*** 的****wwwroot****目录下
    
&nbsp;

- **WebAppCore.UI.TS**  
    前端目录，使用ant-design pro + TypeScript的脚手架，感觉代码量更多，代码更复杂。但好处是在【编译】过程中就能检查函数、对象的调用情况，可以避免很多的运行时的错误，值得一试。
    
&nbsp;

- **部署运行**  
   我使用的是centos，运行以下命令即可安装运行环境
   ```bash
    sudo rpm -Uvh https://packages.microsoft.com/config/rhel/7/packages-microsoft-prod.rpm
    sudo yum update 
    sudo yum install dotnet-sdk-2.2
   ```
   具体可以看微软 [相关文档](https://dotnet.microsoft.com/download/linux-package-manager/centos/sdk-current)  
   只需要把系统发布的文件，放到指定目录下，运行命令即可
   ```bash
    dotnet WebAppCore.MvcUI.dll  //这里是Mvc项目的DLL名称
   ```
