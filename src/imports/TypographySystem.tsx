function Frame() {
  return (
    <div className="bg-white relative self-stretch shrink-0" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-start justify-between py-[40px] relative">
          <div className="h-0 relative shrink-0 w-[40px]" data-name="Line">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 1">
                <line id="Line" stroke="var(--stroke-0, black)" strokeOpacity="0.1" x2="40" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
          <div className="h-0 relative shrink-0 w-[40px]" data-name="Line">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 1">
                <line id="Line" stroke="var(--stroke-0, black)" strokeOpacity="0.1" x2="40" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[53px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Font: 1
      </p>
      <p className="font-['Roboto:Bold',sans-serif] font-bold relative shrink-0 text-[14px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Inter
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-white content-stretch flex flex-col font-['Inter:Italic',sans-serif] font-normal gap-[4px] italic items-start overflow-clip pt-[32px] relative shrink-0 w-full whitespace-nowrap" data-name="Frame">
      <p className="relative shrink-0 text-[60px] text-black">AaBbCc</p>
      <p className="relative shrink-0 text-[#2d3339] text-[14px]">Juxtaposing sleek typography with vibrant hues, the quirky zebra dances amidst carefully crafted patterns.</p>
      <p className="relative shrink-0 text-[#2d3339] text-[14px]">0123456789</p>
    </div>
  );
}

function Font() {
  return (
    <div className="bg-white relative rounded-[8px] self-stretch shrink-0" data-name="Font: 1">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-start leading-[normal] p-[16px] relative">
          <Frame2 />
          <Frame3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[53px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Font: 2
      </p>
      <p className="font-['Roboto:Bold',sans-serif] font-bold relative shrink-0 text-[14px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Rubik
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-white content-stretch flex flex-col font-['Rubik:Italic',sans-serif] font-normal gap-[4px] italic items-start overflow-clip pt-[32px] relative shrink-0 w-full whitespace-nowrap" data-name="Frame">
      <p className="relative shrink-0 text-[60px] text-black">AaBbCc</p>
      <p className="relative shrink-0 text-[#2d3339] text-[14px]">Juxtaposing sleek typography with vibrant hues, the quirky zebra dances amidst carefully crafted patterns.</p>
      <p className="relative shrink-0 text-[#2d3339] text-[14px]">0123456789</p>
    </div>
  );
}

function Font1() {
  return (
    <div className="bg-white relative rounded-[8px] self-stretch shrink-0" data-name="Font: 2">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-start leading-[normal] p-[16px] relative">
          <Frame4 />
          <Frame5 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function FontSystem() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] h-[221px] items-start overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="Font System">
      <Font />
      <Font1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[20px] relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-[1529px]" data-name="Frame">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Fonts</p>
      <FontSystem />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[216px] not-italic relative shrink-0 text-[144px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Inter Bold`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 144px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 216px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HeadingsH1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Headings/H-1">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame7 />
          <Frame8 />
          <Frame9 />
        </div>
      </div>
    </div>
  );
}

function HeadingsH() {
  return (
    <div className="bg-[#f6f8fa] h-[300px] relative rounded-[8px] shrink-0 w-full" data-name="Headings/H-1">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <HeadingsH1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Headings/H-1</p>
          <HeadingsH />
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[180px] not-italic relative shrink-0 text-[120px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Inter Bold`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 120px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 180px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HeadingsH3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Headings/H-2">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame11 />
          <Frame12 />
          <Frame13 />
        </div>
      </div>
    </div>
  );
}

function HeadingsH2() {
  return (
    <div className="bg-[#f6f8fa] h-[264px] relative rounded-[8px] shrink-0 w-full" data-name="Headings/H-2">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <HeadingsH3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Headings/H-2</p>
          <HeadingsH2 />
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[150px] not-italic relative shrink-0 text-[100px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Inter Bold`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 100px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 150px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HeadingsH5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Headings/H-3">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame15 />
          <Frame16 />
          <Frame17 />
        </div>
      </div>
    </div>
  );
}

function HeadingsH4() {
  return (
    <div className="bg-[#f6f8fa] h-[234px] relative rounded-[8px] shrink-0 w-full" data-name="Headings/H-3">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <HeadingsH5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Headings/H-3</p>
          <HeadingsH4 />
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[126px] not-italic relative shrink-0 text-[84px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Inter Bold`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 84px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 126px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HeadingsH7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Headings/H-4">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame19 />
          <Frame20 />
          <Frame21 />
        </div>
      </div>
    </div>
  );
}

function HeadingsH6() {
  return (
    <div className="bg-[#f6f8fa] h-[210px] relative rounded-[8px] shrink-0 w-full" data-name="Headings/H-4">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <HeadingsH7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Headings/H-4</p>
          <HeadingsH6 />
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[105px] not-italic relative shrink-0 text-[70px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Inter Bold`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 70px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 105px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HeadingsH9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Headings/H-5">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame23 />
          <Frame24 />
          <Frame25 />
        </div>
      </div>
    </div>
  );
}

function HeadingsH8() {
  return (
    <div className="bg-[#f6f8fa] h-[189px] relative rounded-[8px] shrink-0 w-full" data-name="Headings/H-5">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <HeadingsH9 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Headings/H-5</p>
          <HeadingsH8 />
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[87px] not-italic relative shrink-0 text-[58px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Inter Bold`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 58px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 87px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HeadingsH11() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Headings/H-6">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame27 />
          <Frame28 />
          <Frame29 />
        </div>
      </div>
    </div>
  );
}

function HeadingsH10() {
  return (
    <div className="bg-[#f6f8fa] h-[171px] relative rounded-[8px] shrink-0 w-full" data-name="Headings/H-6">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <HeadingsH11 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Headings/H-6</p>
          <HeadingsH10 />
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[72px] not-italic relative shrink-0 text-[48px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Inter Bold`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 48px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 72px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HeadingsH13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Headings/H-7">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame31 />
          <Frame32 />
          <Frame33 />
        </div>
      </div>
    </div>
  );
}

function HeadingsH12() {
  return (
    <div className="bg-[#f6f8fa] h-[156px] relative rounded-[8px] shrink-0 w-full" data-name="Headings/H-7">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <HeadingsH13 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame30() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Headings/H-7</p>
          <HeadingsH12 />
        </div>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[60px] not-italic relative shrink-0 text-[40px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Inter Bold`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 40px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 60px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HeadingsH15() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Headings/H-8">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame35 />
          <Frame36 />
          <Frame37 />
        </div>
      </div>
    </div>
  );
}

function HeadingsH14() {
  return (
    <div className="bg-[#f6f8fa] h-[144px] relative rounded-[8px] shrink-0 w-full" data-name="Headings/H-8">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <HeadingsH15 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame34() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Headings/H-8</p>
          <HeadingsH14 />
        </div>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[51px] not-italic relative shrink-0 text-[34px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Inter Bold`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 34px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 51px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HeadingsH17() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Headings/H-9">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame39 />
          <Frame40 />
          <Frame41 />
        </div>
      </div>
    </div>
  );
}

function HeadingsH16() {
  return (
    <div className="bg-[#f6f8fa] h-[135px] relative rounded-[8px] shrink-0 w-full" data-name="Headings/H-9">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <HeadingsH17 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame38() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Headings/H-9</p>
          <HeadingsH16 />
        </div>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[42px] not-italic relative shrink-0 text-[28px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame45() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Inter Bold`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 28px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 42px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HeadingsH19() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Headings/H-10">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame43 />
          <Frame44 />
          <Frame45 />
        </div>
      </div>
    </div>
  );
}

function HeadingsH18() {
  return (
    <div className="bg-[#f6f8fa] h-[126px] relative rounded-[8px] shrink-0 w-full" data-name="Headings/H-10">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <HeadingsH19 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame42() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Headings/H-10</p>
          <HeadingsH18 />
        </div>
      </div>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[24px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame49() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Inter Bold`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 24px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 36px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HeadingsH21() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Headings/H-11">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame47 />
          <Frame48 />
          <Frame49 />
        </div>
      </div>
    </div>
  );
}

function HeadingsH20() {
  return (
    <div className="bg-[#f6f8fa] h-[120px] relative rounded-[8px] shrink-0 w-full" data-name="Headings/H-11">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <HeadingsH21 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame46() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Headings/H-11</p>
          <HeadingsH20 />
        </div>
      </div>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame52() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[30px] not-italic relative shrink-0 text-[20px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame53() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Inter Medium`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 20px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 30px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HeadingsH23() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Headings/H-12">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame51 />
          <Frame52 />
          <Frame53 />
        </div>
      </div>
    </div>
  );
}

function HeadingsH22() {
  return (
    <div className="bg-[#f6f8fa] h-[114px] relative rounded-[8px] shrink-0 w-full" data-name="Headings/H-12">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <HeadingsH23 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame50() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Headings/H-12</p>
          <HeadingsH22 />
        </div>
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame57() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Rubik Regular`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 16px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 24px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BodyB1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Body/B-1">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame55 />
          <Frame56 />
          <Frame57 />
        </div>
      </div>
    </div>
  );
}

function BodyB() {
  return (
    <div className="bg-[#f6f8fa] h-[108px] relative rounded-[8px] shrink-0 w-full" data-name="Body/B-1">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <BodyB1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame54() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Body/B-1</p>
          <BodyB />
        </div>
      </div>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame60() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[14px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame61() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Rubik Regular`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 14px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 21px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BodyB3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Body/B-2">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame59 />
          <Frame60 />
          <Frame61 />
        </div>
      </div>
    </div>
  );
}

function BodyB2() {
  return (
    <div className="bg-[#f6f8fa] h-[105px] relative rounded-[8px] shrink-0 w-full" data-name="Body/B-2">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <BodyB3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame58() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Body/B-2</p>
          <BodyB2 />
        </div>
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame64() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[12px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Rubik Regular`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 12px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 18px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BodyB5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Body/B-3">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame63 />
          <Frame64 />
          <Frame65 />
        </div>
      </div>
    </div>
  );
}

function BodyB4() {
  return (
    <div className="bg-[#f6f8fa] h-[102px] relative rounded-[8px] shrink-0 w-full" data-name="Body/B-3">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <BodyB5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame62() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Body/B-3</p>
          <BodyB4 />
        </div>
      </div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame68() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[10px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame69() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Rubik Regular`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 10px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 15px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BodyB7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Body/B-4">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame67 />
          <Frame68 />
          <Frame69 />
        </div>
      </div>
    </div>
  );
}

function BodyB6() {
  return (
    <div className="bg-[#f6f8fa] h-[99px] relative rounded-[8px] shrink-0 w-full" data-name="Body/B-4">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <BodyB7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame66() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Body/B-4</p>
          <BodyB6 />
        </div>
      </div>
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame72() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[12px] relative shrink-0 text-[8px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame73() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Rubik Regular`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 8px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 12px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BodyB9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Body/B-5">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame71 />
          <Frame72 />
          <Frame73 />
        </div>
      </div>
    </div>
  );
}

function BodyB8() {
  return (
    <div className="bg-[#f6f8fa] h-[96px] relative rounded-[8px] shrink-0 w-full" data-name="Body/B-5">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <BodyB9 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame70() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Body/B-5</p>
          <BodyB8 />
        </div>
      </div>
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame76() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[9px] relative shrink-0 text-[6px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame77() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Rubik Regular`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 6px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 9px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BodyB11() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Body/B-6">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame75 />
          <Frame76 />
          <Frame77 />
        </div>
      </div>
    </div>
  );
}

function BodyB10() {
  return (
    <div className="bg-[#f6f8fa] h-[93px] relative rounded-[8px] shrink-0 w-full" data-name="Body/B-6">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <BodyB11 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame74() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Body/B-6</p>
          <BodyB10 />
        </div>
      </div>
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame80() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[9px] relative shrink-0 text-[6px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame81() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Rubik Regular`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 6px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 9px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BodyB13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Body/B-7">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame79 />
          <Frame80 />
          <Frame81 />
        </div>
      </div>
    </div>
  );
}

function BodyB12() {
  return (
    <div className="bg-[#f6f8fa] h-[93px] relative rounded-[8px] shrink-0 w-full" data-name="Body/B-7">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <BodyB13 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame78() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Body/B-7</p>
          <BodyB12 />
        </div>
      </div>
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame84() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[9px] relative shrink-0 text-[6px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame85() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Rubik Regular`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 6px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 9px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BodyB15() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Body/B-8">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame83 />
          <Frame84 />
          <Frame85 />
        </div>
      </div>
    </div>
  );
}

function BodyB14() {
  return (
    <div className="bg-[#f6f8fa] h-[93px] relative rounded-[8px] shrink-0 w-full" data-name="Body/B-8">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <BodyB15 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame82() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Body/B-8</p>
          <BodyB14 />
        </div>
      </div>
    </div>
  );
}

function Frame87() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame88() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[9px] relative shrink-0 text-[6px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame89() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Rubik Regular`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 6px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 9px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BodyB17() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Body/B-9">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame87 />
          <Frame88 />
          <Frame89 />
        </div>
      </div>
    </div>
  );
}

function BodyB16() {
  return (
    <div className="bg-[#f6f8fa] h-[93px] relative rounded-[8px] shrink-0 w-full" data-name="Body/B-9">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <BodyB17 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame86() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Body/B-9</p>
          <BodyB16 />
        </div>
      </div>
    </div>
  );
}

function Frame91() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame92() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[9px] relative shrink-0 text-[6px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame93() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Rubik Regular`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 6px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 9px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BodyB19() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Body/B-10">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame91 />
          <Frame92 />
          <Frame93 />
        </div>
      </div>
    </div>
  );
}

function BodyB18() {
  return (
    <div className="bg-[#f6f8fa] h-[93px] relative rounded-[8px] shrink-0 w-full" data-name="Body/B-10">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <BodyB19 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame90() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Body/B-10</p>
          <BodyB18 />
        </div>
      </div>
    </div>
  );
}

function Frame95() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame96() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[9px] relative shrink-0 text-[6px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame97() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Rubik Regular`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 6px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 9px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BodyB21() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Body/B-11">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame95 />
          <Frame96 />
          <Frame97 />
        </div>
      </div>
    </div>
  );
}

function BodyB20() {
  return (
    <div className="bg-[#f6f8fa] h-[93px] relative rounded-[8px] shrink-0 w-full" data-name="Body/B-11">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <BodyB21 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame94() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Body/B-11</p>
          <BodyB20 />
        </div>
      </div>
    </div>
  );
}

function Frame99() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0 w-[17px]" data-name="Frame">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#2d3339] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Frame100() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[9px] relative shrink-0 text-[6px] text-black whitespace-nowrap">AaBbCc</p>
        </div>
      </div>
    </div>
  );
}

function Frame101() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Roboto:Bold',sans-serif] font-bold gap-[28px] items-start leading-[0] px-[12px] py-[6px] relative text-[12px] text-black w-full whitespace-nowrap">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Family:
            </span>
            <span className="leading-[normal]">{` Rubik Regular`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Font Size:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 6px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Line Height:
            </span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` 9px`}</span>
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] text-[#5e5e5e]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Letter Spacing: `}</span>
            <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
              0px
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BodyB23() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Body/B-12">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[16px] relative size-full">
          <Frame99 />
          <Frame100 />
          <Frame101 />
        </div>
      </div>
    </div>
  );
}

function BodyB22() {
  return (
    <div className="bg-[#f6f8fa] h-[93px] relative rounded-[8px] shrink-0 w-full" data-name="Body/B-12">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <BodyB23 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame98() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-black uppercase whitespace-nowrap">Body/B-12</p>
          <BodyB22 />
        </div>
      </div>
    </div>
  );
}

function Typography() {
  return (
    <div className="bg-[#f3e7ff] content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[16px] relative rounded-[24px] shrink-0" data-name="Typography">
      <Frame1 />
      <Frame6 />
      <Frame10 />
      <Frame14 />
      <Frame18 />
      <Frame22 />
      <Frame26 />
      <Frame30 />
      <Frame34 />
      <Frame38 />
      <Frame42 />
      <Frame46 />
      <Frame50 />
      <Frame54 />
      <Frame58 />
      <Frame62 />
      <Frame66 />
      <Frame70 />
      <Frame74 />
      <Frame78 />
      <Frame82 />
      <Frame86 />
      <Frame90 />
      <Frame94 />
      <Frame98 />
    </div>
  );
}

function TokenWrapperFrame() {
  return (
    <div className="bg-white relative self-stretch shrink-0" data-name="Token Wrapper Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-start p-[16px] relative">
          <Typography />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ContentFrame() {
  return (
    <div className="bg-white h-[5748px] relative shrink-0" data-name="Content Frame">
      <div className="content-stretch flex h-full items-start overflow-clip py-[40px] relative rounded-[inherit]">
        <TokenWrapperFrame />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame102() {
  return (
    <div className="bg-white relative self-stretch shrink-0" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-start justify-between py-[40px] relative">
          <div className="h-0 relative shrink-0 w-[40px]" data-name="Line">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 1">
                <line id="Line" stroke="var(--stroke-0, black)" strokeOpacity="0.1" x2="40" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
          <div className="h-0 relative shrink-0 w-[40px]" data-name="Line">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 1">
                <line id="Line" stroke="var(--stroke-0, black)" strokeOpacity="0.1" x2="40" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TypographySystem() {
  return (
    <div className="bg-white content-stretch flex items-start justify-center relative size-full" data-name="Typography System">
      <Frame />
      <ContentFrame />
      <Frame102 />
    </div>
  );
}