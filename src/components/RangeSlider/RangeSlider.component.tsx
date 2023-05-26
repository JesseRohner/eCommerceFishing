import cx from "classnames"
import { CSSProperties, useMemo, useRef } from "react"
import { getTrackBackground, Range, useThumbOverlap } from "react-range"

export type RangeSliderProps = {
  step?: number
  min?: number
  max?: number

  values: Array<number>
  onChange: Function

  colors?: Array<string>

  hasThumbLabel?: boolean
  hasMark?: boolean
}

const SELECTED_RANGE_COLOUR = "#0BB8A9"
const NON_SELECTED_RANGE_COLOUR = "#C8CBD3"

const ThumbLabel = ({ rangeRef, values, index }: any) => {
  const [labelValue, labelStyle] = useThumbOverlap(rangeRef, values, index, 1)

  return (
    <div
      className="absolute bottom-[calc(100%+6px)] flex items-center justify-center"
      style={labelStyle as CSSProperties}
    >
      {(labelStyle as CSSProperties).visibility !== "hidden" && (
        <div className="bg-[#070B14] w-[10px] h-[10px] rotate-45 absolute -bottom-[3px]" />
      )}
      <div
        data-label={index}
        className="bg-[#070B14] text-white text-xs rounded-lg px-1 py-0.5 whitespace-nowrap z-10"
      >
        {labelValue as string}
      </div>
    </div>
  )
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  step = 1,
  min: _min,
  max: _max,

  values,
  onChange,

  colors = [
    NON_SELECTED_RANGE_COLOUR,
    SELECTED_RANGE_COLOUR,
    NON_SELECTED_RANGE_COLOUR,
  ],

  hasThumbLabel,
  hasMark,
}) => {
  const rangeRef: any = useRef<Range | null>(null)
  const initialValues = useMemo(() => values, [])

  const min = _min ?? initialValues[0]
  const max = _max ?? initialValues[1]

  return (
    <div className="flex justify-center flex-wrap">
      <Range
        ref={rangeRef}
        step={step}
        min={min}
        max={max}
        values={values}
        onChange={onChange as (values: Array<number>) => void}
        renderMark={({ props, index }) => {
          if (!hasMark) return

          if (index !== 0 && index !== Math.ceil((max - min) / step))
            return (
              <div
                {...props}
                style={{
                  ...props.style,
                  backgroundColor:
                    index * step + min < values[0] ||
                    index * step + min > values[1]
                      ? NON_SELECTED_RANGE_COLOUR
                      : SELECTED_RANGE_COLOUR,
                }}
                className="w-[3px] h-[20px]"
              />
            )
        }}
        renderTrack={({ props, children }) => (
          <div
            style={props.style}
            className="flex w-full h-[14px]"
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
          >
            <div
              ref={props.ref}
              className="w-full h-[14px] rounded-[10px]"
              style={{
                background: getTrackBackground({ values, min, max, colors }),
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, index, isDragged }) => (
          <div
            {...props}
            style={props.style}
            className="flex items-center justify-center w-5 h-5 bg-white rounded-full border border-blue-100 shadow-[0px_2px_4px_rgba(0,0,0,0.4)]"
          >
            {hasThumbLabel && (
              <ThumbLabel
                rangeRef={rangeRef.current}
                values={values}
                index={index}
              />
            )}

            <div
              className={cx("w-[3px] h-[10px]", {
                "bg-blue-900/25": !isDragged,
                "bg-green-600": isDragged,
              })}
            />
          </div>
        )}
      />
    </div>
  )
}

export default RangeSlider
