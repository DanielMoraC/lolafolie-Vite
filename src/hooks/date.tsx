import moment from "moment/min/moment-with-locales"


interface FormatDateBookProps {
    date: string
}

export function formatDateBook({ date }: FormatDateBookProps) {
    moment.locale('es')

    return moment(date).format('DD MMMM YYYY')
}