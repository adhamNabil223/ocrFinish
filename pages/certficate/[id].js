import withAuth from '@/components/auth/Authentication'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import domtoimage from 'dom-to-image';
import { useTranslation } from 'react-i18next';
import { instance } from '@/components/api/config';
import { ClipLoader } from 'react-spinners';


 function certficate() {
    const router = useRouter()
    const {t} = useTranslation()
    const [certficateData, setCertficateData] = useState(null)

    function pdf2() {
        let input = document.getElementById('pdf');
        const printBtn = document.getElementById('printBtn');
        const backBtn = document.getElementById('backBtn');
        printBtn.style.display = 'none';
        backBtn.style.display = 'none';
    
        domtoimage.toPng(input)
            .then(function (dataUrl) {
                const pdf = new jsPDF('p', 'mm', 'a3');
    
                // Set left margin and right margin (10mm on each side)
                const marginLeft = 10;
                const marginRight = 10;
    
                // Calculate available width after applying margins
                const availableWidth = pdf.internal.pageSize.width - marginLeft - marginRight;
    
                // Calculate aspect ratio to maintain proportions
                const imgAspectRatio = input.clientWidth / input.clientHeight;
    
                // Calculate image width and height to fit within available width
                const imgWidth = availableWidth;
                const imgHeight = availableWidth / imgAspectRatio;
    
                pdf.addImage(dataUrl, 'PNG', marginLeft, 5, imgWidth, imgHeight);
                pdf.autoPrint({ variant: 'non-conform' });
                pdf.save('certificate.pdf');
                pdf.autoPrint();
            });
    
        printBtn.style.display = 'inline';
        backBtn.style.display = 'inline';
    }

     async function getCertficate(id){
        const x = await instance.get(`/documents/${id}`)
        setCertficateData(x)
      }

useEffect(() => {
 const url = window.location.href
const segments = url.split('/');
const lastSegment = segments[segments.length - 1];
getCertficate(lastSegment)
}, [])


if(certficateData === "not found"){
    return(
        <div className='text-center'>
            <h2>Certficate Not Found</h2>
            <button onClick={()=>router.back()} id='backBtn' type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">{t('Back')}</button>
        </div>
    )
}



  return   (certficateData != null) ?  (
    <div className='w-[90%] direction' >
    <div className='text-left'>
     <button onClick={()=> pdf2()} id='printBtn' className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">{t('Print')}</button>
     <button onClick={()=>router.back()} id='backBtn' type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">{t('Back')}</button>
     </div>
     <div id='pdf'>

   
    <div className='flex items-center justify-between text-start' >
    <div className="imageStyle mb-10 text-end">
    <img src="/Bupa-logo.png" alt="logo" />
    </div> 
  
    </div>   
    <div>
    </div>
    <div className='flex justify-between'>
     {/* patient info */}
    <div className="height">
    <p>
        السيد/ة : <input type="text" defaultValue={`${certficateData.data.data.id_data.first_name} ${certficateData.data.data.id_data.last_names}`} className='w-[100%]'/>
    </p>
    <p>
        عنوان المراسلات : 
        <p>{certficateData.data.data.certificate_data.output.address}</p>
    </p>
    </div>
     {/* end of patient info */}
     {/* company info  */}
     <div>
    <h3>بوبا للتامين</h3>
    <p>مبنى رقم٣/ب١   ، قطعة٣٣       ، ميفيدا بيزنس بارك،
        التجمع الخامس</p>
    <p>رقم بريدي١١٨٣٥ ,</p>
    <p>القاهرة الجديدة، مصر</p>
    <p>هاتف : (  24003666 02  - 16816 -  224003600  20+)</p>
    <p>فاكس : (24003749 02)</p>
    <a href="mailto:egyptcustserv@bupa.com">egyptcustserv@bupa.com</a>
    <br />
    <a href="https://www.bupaglobal.com/en">bupaglobal.com</a>
    </div>
     {/* end of company info  */}

     </div>
     {/* app patient document info */}
     <div className='my-10'>
    <h3>عناية السيد /  {certficateData.data.data.id_data.first_name} {certficateData.data.data.id_data.last_names}</h3>
    <p>يمثل هذا المستند وثيقة التأمين الخاصة بك والذي يمنحك نبذة مختصرة عن خطتك التأمينية يمكنك
        الإطلاع على كافة التفاصيل المتعلقة بالمزايا والحدود والاستثناءات المطبقة على خطة التأمين الخاصة
        بك في كتيب المزايا والاستثناءات
    </p>
    <p>
        نؤكد بموجب هذه الوثيقة أن الأشخاص المذكورين أدناه عملاء بخطة بوبا إيجيبت للتأمين الطبي تغطي
        الخطة التأمينية تكاليف العلاج المستحق متضمناW تكاليف الإقامة في المستشفى وتكاليف العلاج الفعال
        بحد سنوي أقصى قدره
        <span className="different">
           {" " + certficateData.data.data.certificate_data.output.annual_maximum + " " + certficateData.data.data.certificate_data.output.annual_maximum_currency + " "}
        </span>
        برجاء ملاحظة أن هناك بعض المزايا التي تطبق عليها الحدود الجزئية
    </p>
    <p>
        وتفضلوا بقبول وافر الاحترام،
    </p>
</div>
     
     {/* end of app patient document info */}
     {/* app data document */}
     <h3>بوبا إيجيبت للتأمين</h3>

<p className="theDocument">
    <span>رقم الوثيقة: {" " +certficateData.data.data.certificate_data.output.certificate_number + " "}</span>
    <span> الصادرة في : {" " + certficateData.data.data.certificate_data.output.certificate_issuance_date}</span>
</p>

{
     certficateData.data.data.certificate_data.customers.map((data , key)=>{
                return(
                    <div key={key}>
                        {
                            data.is_main ? 
                            <table className='certficateTable'>
                            <tr className="head">
                                <th>الاسم</th>
                                <th>تاريخ الميلاد</th>
                                <th>تاريخ بدء التغطية</th>
                                <th>تاريخ نهاية التغطية</th>
                                <th>النطاق الجغرافي للتغطية</th>
                            </tr>
                            {
                                 certficateData.data.data.certificate_data.customers.map((userData , key)=>{
                                    return(
                                        <tr  className="details" key={key}>
                                        <td>السيد/ة : {userData.name}</td>
                                        <td>{userData.date_of_birth}</td>
                                        <td>{userData.cover_start}</td>
                                        <td>{userData.cover_end}</td>
                                        <td>{userData.area_of_cover}</td>
                                            </tr>
                                    )
                                 })
                            }
                                  
                            </table>
                            : ''
                        }
                       {/* contract info  */}
     <div>
    <h3>معلومات العقد</h3>
    <p>تتولى شركة بوبا إيجيبت للتأمين توفير التغطية التأمينية لخطة التأمين الخاصة بك</p>
    <p className="font">
        <span>البيانات الخاصة بالسيدة : {`${certficateData.data.data.id_data.first_name} ${certficateData.data.data.id_data.last_names}`}</span>
        <span> رقم عضوية  : {certficateData.data.data.certificate_data.customers[key].membership_number} </span>
    </p>
    <p className="font">
        <span> تاريخ الميلاد : {data.date_of_birth}</span>
        <span>  محل الإقامة : مصر</span>
    </p>
    <table className='w-[100%]'>
        <tr className="head">
            <th>الخطة التأمينية</th>
            <th>التحمل السنوى 

                <span className="different">
                   ({certficateData.data.data.certificate_data.output.annual_maximum} {certficateData.data.data.certificate_data.output.annual_maximum_currency})
                </span>
            </th>
            <th>الحد الأقصى السنوي  
                <span className="different">
                ({certficateData.data.data.certificate_data.output.annual_maximum} {certficateData.data.data.certificate_data.output.annual_maximum_currency})
                </span>
            </th>
        </tr>

        {
           certficateData.data.data.certificate_data.customers[key].plans.map((plans , key)=>{
                return(
                    <tr className="details" key={key}>
                    <td className="different">{JSON.parse(plans).plan_name}</td>
                    <td className="different">{!JSON.parse(plans).annual_deductible ? 'لا يوجد' : JSON.parse(plans).annual_deductible}</td>
                    <td className="different">{JSON.parse(plans).annual_maximum}</td>
                  </tr>
                )

            })
        }
    </table>
    {
        certficateData.data.data.certificate_data.customers[key].additionalInformation != null ? 
        certficateData.data.data.certificate_data.customers[key].additionalInformation.map((intermediaryName , index)=>{
            return(
<table className='w-[100%] my-5' key={index}>
            <tr className="head">
                <th>معلومات اضافية</th>
                <th></th>
            </tr>
            <tr className="details">
                <td>وسيط التأمين</td>
                <td>{intermediaryName.intermediaryName}</td>
            </tr>
            <tr className="details">
                <td>رقم التسجيل بالهيئة العامة للرقابة المالية</td>
                <td>{intermediaryName.regulatorId}</td>
            </tr>
            <tr className="details">
                <td>نسبة العمولة الأساسية لوسيط التأمين</td>
                <td>{intermediaryName.regulatorId} %</td>
            </tr>
            </table>
            )
            
        })
       
        : ''
    }
   
    <table className='w-[100%] my-5'>
        <tr className="head w-[100%]">
            <th className='w-[100%]'>بيانات الاكتتاب</th>
        </tr>
        <tr className="details">
            {
                certficateData.data.data.certificate_data.customers[key].underwriting_terms.includes("لا يوجد") ?
                <td>
                لا يوجد
                </td>
                :
               certficateData.data.data.certificate_data.customers[key].underwriting_terms.map((item)=>{
                    return(
                        <td>
                            {JSON.parse(item).case}
                        </td>
                    )
                })
            }
            <td> </td>
        </tr>
    </table>
    {
         certficateData.data.data.certificate_data.customers[key].underwriting_terms.includes("لا يوجد") ? 
         ''
         :
         certficateData.data.data.certificate_data.customers[key].underwriting_terms.map((item)=>{
            return(
                <>
                    {JSON.parse(item).is_covered ? 
                         <div className="patientData">
                         <p className="patients">
                             يتم تغطية الحالات المرضية السابقة للتعاقد التالية بموجب خطتك التأمينية :
                         </p>
                         <p className="details" style={{"color": "red"}}>
                            : تفاصيل الحالة المرضية السابقة للتعاقد التي يتم تخطيتها
                            {JSON.parse(item).case}
                         </p>
                     </div>
                    :
                    <div className="patientData">
                    <p className="patients">
                        لا يتم تغطية الاستثناءات الخاصة التالية بموجب خطتك التأمينية :
                    </p>
                    <p className="details" style={{"color": "red"}}>
                        تفاصيل الحالة المرضية السابقة      للتعاقد المستثناه من التغطية  : {" "}
                        {JSON.parse(item).case}
                    </p>
                </div>  
                }
                </>
            )
        })
    }
    

      </div>
     {/*end contract info  */}
                        </div>
                )
          
        
     })
}


     {/* end of app data document */}

     <p className='pb-10'>
        يمكنك الاطلاع والحصول على نسخة من دليل حماية المتعاملين المصدر من قبل الهيئة
             العامة للرقابة المالية عن طريق التواصل مع فريق خدمة العملاء لدينا أو زيارة موقع
                {" "}
             <a href="http://www.fra.gov.eg/" target="_blank">fra.gov.eg</a>
                {" "}
             لتحميل نسخة الدليل
    </p>
  
     {/* footer */}

<div className="footer">
<p className='w-[50%]'>
BUPA   EGYPT   INSURANCE   SAE,   a   company   incorporated   in   Egypt   (Commercial
Registry   No:   67829)   whose   head   office   and   legal   domicile   is   at   Bldg   3/B1,   Mivida
Business Park, 5th  Settlement, New Cairo, 11835, Egypt, with issued capital of EGP 60
million. Bupa Egypt Insurance SAE is regulated under law no.10 for year 1981 and its
executive regulation holds Financial Regulatory Authority (FRA) license under number
20 for year 2004.
    </p>
<p>
     بوبا ايجيبت للتامين ش.م.م هي شركة تاسست في مصر ويقع مقرها الرئيسى و محلهاالقانونى فى مبنى رقم٣/ب١ مجمع ميفيدا التجارى، التجمع الخامس، القاهرة الجديدة رقم بريدى١١٨٣٥ ، مصر 
    </p>
        </div>



     {/* end of footer */}
     </div>
    </div>
  ) : 
  <div className='text-center'>
  <ClipLoader color="#3b82f6" />
  </div>
}

export default withAuth(certficate)