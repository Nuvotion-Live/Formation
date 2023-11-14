import './index.dark.css'
import './index.light.css'

import Div100vh from 'react-div-100vh'
export { Div100vh }
export { Article } from './components/Article/Article'
export { Avatar } from './components/Avatar/Avatar'
export { ArticlePreview } from './components/ArticlePreview/ArticlePreview'
export { AspectRatio } from './components/AspectRatio/AspectRatio'
export { Auth } from './components/Auth/Auth'
export { Box } from './components/Box/Box'
export { Break } from './components/Break/Break'
export { Button, ButtonProps } from './components/Button/Button'
export { ColorPicker } from './components/ColorPicker/ColorPicker'
export { DateAndTimePicker } from './components/DateAndTimePicker/DateAndTimePicker'
export { DatePicker } from './components/DatePicker/DatePicker'
export { Dropdown } from './components/Dropdown/Dropdown'
export { Empty } from './components/Empty/Empty'
export { Gap } from './components/Gap/Gap'
export { Grid } from './components/Grid/Grid'
export { NavMenuBars } from './components/NavMenuBars/NavMenuBars'
export { Icon } from './components/Icon/Icon'
export { LineBreak } from './components/LineBreak/LineBreak'
export { List } from './components/ListEditor/List'
export { Label } from './components/Label/Label'
export { Item, ItemProps } from './components/ListEditor/Item'
export { ExpandableList } from './components/ListEditor/ExpandableList'
export { ExpandableLists } from './components/ListEditor/ExpandableLists'
export { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner'
export { Location } from './components/Location/Location'
export { Notification } from './components/Notification/Notification'
export { NavHeader } from './components/NavHeader/NavHeader'
export { NavSpaces } from './components/NavSpaces/NavSpaces'
export { Navigation } from './components/Navigation/Navigation'
export { NumberRange } from './components/Sliders/NumberRange'
export { NumberSlider } from './components/Sliders/NumberSlider'
export { NumberSliderVertical } from './components/Sliders/NumberSliderVertical'
export { Page } from './components/Page/Page'
export { Radio } from './components/Radio/Radio'
export { Reorder } from './components/Reorder/Reorder'
export { Ripple } from './components/Ripple/Ripple'
export { SearchSortFilter } from './components/SearchSortFilter/SearchSortFilter'
export { Select } from './components/Select/Select'
export { Sidebar } from './components/Sidebar/Sidebar'
export { Spacer } from './components/Spacer/Spacer'
export { StyleHTML } from './components/StyleHTML/StyleHTML'
export { ParseHTML } from './components/ParseHTML/ParseHTML'
export { Tabs } from './components/Tabs/Tabs'
export { Tags } from './components/Tags/Tags'
export { TextInput, TextInputProps } from './components/TextInput/TextInput'
export { TimePicker } from './components/TimePicker/TimePicker'
export { TimeZone } from './components/TimeZone/TimeZone'
export { Placeholders } from './components/Placeholders/Placeholders'
export { Modal } from './components/Modal/Modal'
export { NavTabs } from './components/NavSpaces/NavTabs' // fix
export { SpacesSidebar } from './components/NavSpaces/SpacesSidebar'
export { SpaceSidebar } from './components/NavSpaces/SpaceSidebar'
export { ImagePicker } from './components/ImagePicker/ImagePicker'
export { RichTextEditor } from './components/RichTextEditor/RichTextEditor'
export { Steps } from './components/Steps/Steps'
export { AutocompleteDropdown } from './components/AutocompleteDropdown/AutocompleteDropdown'
export { Checkboxes } from './components/Checkboxes/Checkboxes'
export { FileUpload } from './components/FileUpload/FileUpload'
export { FileDrop } from './components/DragAndDrop/FileDrop'
export { DropTarget } from './components/DragAndDrop/DropTarget'
export { DragOrigin } from './components/DragAndDrop/DragOrigin'
export { FileBrowser } from './components/FileBrowser/FileBrowser'
export { VideoPlayer } from './components/VideoPlayer/VideoPlayer'
export { AudioPlayer } from './components/AudioPlayer/AudioPlayer'
export { NumberInput } from './components/NumberInput/NumberInput'
export { GroupRadius } from './components/GroupRadius/GroupRadius'
export { ZoomSlider } from './components/Sliders/ZoomSlider'
export { Docking } from './components/Docking/Docking'
export { Tile } from './components/Tile/Tile'
export { Fit } from './components/Fit/Fit'
export { TileGridPlaceholder } from './components/TileGridPlaceholder/TileGridPlaceholder'
export { TitleEditor } from './components/TitleEditor/TitleEditor'
export { ProgressTimer } from './components/ProgressTimer/ProgressTimer'

import { Link } from './components/Link/Link'
let linkComponent = Link as any
export const getLinkComponent = () => linkComponent
export const setLinkComponent = (newLinkComponent : React.ReactNode) => {
  linkComponent = newLinkComponent
}

import { LinkContext, Linker } from './components/Linker/Linker'

export {
  LinkContext,
  Linker
}

// hooks
export { useBreakpoint } from './hooks/useBreakpoint'
export { useOnClickOutside } from './hooks/useOnClickOutside'
export { useScrollTo } from './hooks/useScrollTo'
export { useIsScrolledToBottom } from './hooks/useIsScrolledToBottom'
export { useScrollVisible } from './hooks/useScrollVisible'
export { usePrevious } from './hooks/usePrevious'

// utils
export { getSuperscriptOrdinal } from './utils/getSuperscriptOrdinal'
export { getOrdinal } from './utils/getOrdinal'
export { isTouchCapable } from './utils/isTouchCapable'  
export { getTimezone } from './utils/getTimezone'
export { reorderItems } from './utils/reorderItems'
export { LabelColor, labelColors, LabelType, getLabelColor } from './utils/labels'
export { getColorFromGuid } from './utils/getColorFromGuid'
export { getInitials } from './utils/getInitials'
export { capitalizeFirstLetter } from './utils/capitalizeFirstLetter'
export { copyToClipboard } from './utils/copyToClipboard'  
export { downloadFile } from './utils/downloadFile'
export { shareText } from './utils/shareText'
export { shareTextViaEmail } from './utils/shareTextViaEmail'
export { getTimeAgo } from './utils/getTimeAgo'
export { blobToBase64 } from './utils/blobToBase64'
export { timestamp } from './utils/timestamp'
export { getZoomScale } from './utils/getZoomScale'
export { stringInArray } from './utils/stringInArray'
export { getCookie } from './utils/getCookie'
export { resourceUrlToDataUrl } from './utils/resourceUrlToDataUrl'
export { resizeDataURL } from './utils/resizeDataURL'
export { markdownToHTML } from './utils/markdownToHTML'
export { HTMLtoMarkdown } from './utils/HTMLtoMarkdown' 
export { titleToSlug } from './utils/titleToSlug'
export { slugToTitle } from './utils/slugToTitle'
export { pickIndexFromArray, hashString } from './utils/pickIndexFromArray'
export { generateUUID } from './utils/generateUUID'
export { scrollToElementById } from './utils/scrollToElementById'
export { getAlphabetLetter } from './utils/getAlphabetLetter'
export { generateThumbnail } from './utils/generateThumbnail'
export { generateVideoThumbnails } from './utils/generateThumbnail'
export { blobURLToFile } from './utils/blobURLToFile'
export { insertCSS } from './utils/insertCSS'